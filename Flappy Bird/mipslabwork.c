/* mipslabwork.c

   This file written 2015 by F Lundevall
   Updated 2017-04-21 by F Lundevall

   This file should be changed by YOU! So you must
   add comment(s) here with your name(s) and date(s):

   This file is modified by Esra Salman in March of 2023.
   For copyright and licensing, see file COPYING */

#include <stdint.h>   /* Declarations of uint_32 and the like */
#include <pic32mx.h>  /* Declarations of system-specific addresses etc */
#include "mipslab.h"  /* Declatations for these labs */

/*height and width of screen, subject (bird) and objects (obstacles) in x and y-axis*/
#define subjectheight 4 //bird height in I/O basic shield screen
#define subjectwidth 7 //bird width in I/O basic shield screen
#define objectwidth 7 //obstacles width in I/O basic shield screen
#define height 32 //screen height in I/O basic shield screen
#define width 128 //screen width in I/O basic shield screen

/*identifiers for functions to randomisize obstacles*/
int ran; //random identifier for later use
int endRanx = 0; //final random identifier for later use
int endRany = 0; //final random identifier for later use
int ranOx; //first random obstacle 
int ranOy; //second random obstacle 

 /*both first and second obstacle psotions in x and y-axis*/
double xox = 120; //position of obstacle 
double yoy = 20; // position of obstacle 
double xoy = 200; //position of second obstacle 
double yox = 20; //position of second obstacle

/*subject, as in the bird, left and top most bounds*/
double x = 10; //left bound of the subject in x-axis
double y = 8; //top bound of the subject in y-axis

/*complete display */
unsigned char screen[128 * 4] = {0}; 


/*addition of pixels in basic I/O shield, also the prevention of out of bounds*/
void px(int x, int y, uint8_t *array)
{
    if(x <= 0 || x >= width || y <= 0 || y >= height) //in this case
        return; //nothing
    int page = y / 8;
    array[page * 128 + x] |= (1 << (y - page * 8));
}

/*adding complete pixelformation of the subject (bird)*/
void subjectform()  
{
    int a = 0; 
    int b = 0;
    while(a < subjectheight) 
      {
        for(b = 0; b < subjectwidth; b++) 
          {
              if (!((subjectwidth - b == 7) && (subjectheight - a == 4) ||
                  (subjectwidth - b == 6) && (subjectheight - a == 4)))
                {
                  px((int) x + b,(int) y + a, screen);
                }
          }
      a++;
      }
}

/*adjustment of buttons, use of PORTS D & F to activate*/
int bt(void)
{
    return ((PORTD >> 5) & 0x7);
}

int bt2(void)
{
    return ((PORTF >> 1) & 0x01);
}

/*function to adjust movement of subject: moving left, right, up and also to stay within screen limits.*/
void subjectflying() 
{
   
    if(bt() & 2)  //BTN3
      {    
        if(y >= 0)
            y -= 0.25;
      }

    if(bt() & 1) //BTN2
      {
        if(x <= (127 - subjectwidth))
            x += 0.25;
      }
}

/*randomization of obstacles height for both first & second obstacle*/
int obstacleheightx() 
{
  if (xox == 127) 
    {
    ranOx = endRanx;
    }
    return ranOx;
}

int obstacleheighty() 
{
  if (xoy == 127) 
    {
    ranOy = endRany;
    }
    return ranOy;
}

/*form of first obstacle, also pipe*/
void obstacleformx() 
{
  if (xox == 0) 
    {
    xox = 127;
    }

   int a = 0; 
   int b = 0;
   int z = 0;
   z = obstacleheightx();
   if (z != 0) 
    {
    yoy = ((2 * z) + 8); //height at which obstacle gets drawn
    }
    while(a < (31 - yoy)) 
      {
      for (b = 0; b < objectwidth; b++) 
        {
          px((int) xox + b,(int) yoy + a + 5, screen);
        }
      a++;
      }
}

/*form of second obstacle, also pipe*/
void obstacleformy() 
{
  if (xoy == 0) 
    {
    xoy = 127;
    }

   int a = 0; 
   int b = 0;
   int z = 0;
   z = obstacleheighty();
   if (z != 0) 
    {
    yox = ((2 * z) + 8); //height at which pipe gets drawn
    }
    while(a < (31 - yox)) 
    {
      for (b = 0; b < objectwidth; b++) 
      {
          px((int) xoy + b,(int) yox + a, screen);
      }
      a++;
  }
}

/*clear content*/
void clear() 
{
    int a = 0;
    while(a < sizeof(screen)) 
    {
        screen[a] = 0;
        a++; 
    }
}

/*structure of game for all possible contact between subject and screen, subject and obstacle*/
int contact() 
{
  /*identifiers for basic I/O shield screen bounds*/
    int left = 0; //subject only moves from left to right
    int upper = 0; //screen's upper bounds
    int lower = height; //screen's lower bounds
  /*identifiers for basic I/O shield subject bounds*/
    int subjectUpper = y; //as identified above for subject form
    int subjectLower = y + subjectheight; //as identified above for subject form
    int subjectRight = x + subjectwidth; //as identified above for subject form
    int subjectLeft = x; //as identified above for subject form

  /*identifiers for basic I/O shield object bounds*/
    int obstacleUpperx = yoy; //as identified above for object form
    int obstacleleftx = xox; //as identified above for object form
    int obstaclerighty = xox + objectwidth; //as identified above for object form
    int obstacleUppery = yox; //as identified above for object form
    int obstaclelefty = xoy; //as identified above for object form
    int obstaclerightx = xoy + objectwidth; //as identified above for object form

  /*When contact is made between screen and subject*/ 
    if (subjectUpper == upper ||
        subjectLower == lower ||
        subjectLeft == left) 
              {
                return 1;
              }

  /*When contact is made between subject and obstacle */
    if (((subjectUpper == obstacleUpperx)) && ((subjectRight >= obstacleleftx)) &&
        ((subjectLeft <= obstaclerighty)) || ((subjectRight == obstacleleftx))
          && ((subjectLower >= obstacleUpperx)) || ((subjectLeft == obstaclerighty))
            && ((subjectLower >= obstacleUpperx)))
              {
                return 1;
              }

  /*When contact is made between subject and obstacle */
    if (((subjectLower == obstacleUppery) && ((subjectRight >= obstaclelefty) && (subjectLeft <= obstaclerightx))) ||
            ((subjectRight == obstaclelefty) && (subjectLower >= obstacleUppery)) ||
            ((subjectLeft == obstaclerightx) && (subjectLower >= obstacleUppery))) 
              {
                return 1;
              }
  
    else
      return 0;
}


void gamestart() 
{
  int action = 1; 
    while(action)
    {   
      subjectflying();
      clear();

    /*flag-out, gravitationen, timer4*/
		if (IFS(0) & 0x1000) 
      {
        if (y >= 0) 
          {
            y += 0.25;
			    }
		    IFSCLR(0) = 0x1000; //clear
		  }

    /*flag-out, obstacle changes*/
		if (IFS(0) & 0x10000) 
      {
        if(xox > 0) 
          {
				    xox -= 0.25;
			    }

        if(xoy > 0) 
          {
            xoy -= 0.25;
          }

		    IFSCLR(0) = 0x10000; //clear
		  }
       
        obstacleformx();
        obstacleformy();
        subjectform();
        display_image(screen);
        action = !contact();
    }
}

/*when game is lost*/
void fail() 
{
      int youlost = 1; 
      display_string(0, "You lost");
      display_string(1, "Bye");
      display_string(3, "BTN4 for menu");
      display_update();

      while(youlost) 
        {
          if(bt() & 4) //möjligt
            {
              youlost = 0;
            }
        }
}

/*the functions of main screen start*/
void start() 
{
    int startscreen = 1; 
    display_string(0, "Esra's & Nora's");
    display_string(1, "Flappy bird");
    display_string(3, "press BTN1 ");
    display_update();
    while(startscreen) 
      {
         if(bt2()& 1) 
          {
            startscreen = 0; //hur ska den spela igen
          }
      }
} 

/*structure of game*/
void game() 
{
    int gamemeyou = 1; 
    while(gamemeyou == 1) 
      {
        start();
        timer4();
        gamestart();
        fail();
      }
}
