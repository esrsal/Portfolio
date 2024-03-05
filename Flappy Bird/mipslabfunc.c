/* 	mipslabfunc.c
   	This file written 2015 by F Lundevall
   	Some parts are original code written by Axel Isaksson
   	For copyright and licensing, see file COPYING
	The rest is written by Esra Salman*/

#include <stdint.h>
#include <pic32mx.h>
#include "mipslab.h"

#define DISPLAY_CHANGE_TO_COMMAND_MODE (PORTFCLR = 0x10)
#define DISPLAY_CHANGE_TO_DATA_MODE (PORTFSET = 0x10)

#define DISPLAY_ACTIVATE_RESET (PORTGCLR = 0x200)
#define DISPLAY_DO_NOT_RESET (PORTGSET = 0x200)

#define DISPLAY_ACTIVATE_VDD (PORTFCLR = 0x40)
#define DISPLAY_ACTIVATE_VBAT (PORTFCLR = 0x20)

#define DISPLAY_TURN_OFF_VDD (PORTFSET = 0x40)
#define DISPLAY_TURN_OFF_VBAT (PORTFSET = 0x20)

/*taken from lab3*/
void quicksleep(int cyc) {
	int i;
	for(i = cyc; i > 0; i--);
}

/*Taken from lab3*/
uint8_t spi_send_recv(uint8_t data) {
	while(!(SPI2STAT & 0x08));
	SPI2BUF = data;
	while(!(SPI2STAT & 1));
	return SPI2BUF;
}

/*Taken from lab3*/
void display_init(void) {
    DISPLAY_CHANGE_TO_COMMAND_MODE;
	quicksleep(10);
	DISPLAY_ACTIVATE_VDD;
	quicksleep(1000000);

	spi_send_recv(0xAE);
	DISPLAY_ACTIVATE_RESET;
	quicksleep(10);
	DISPLAY_DO_NOT_RESET;
	quicksleep(10);

	spi_send_recv(0x8D);
	spi_send_recv(0x14);

	spi_send_recv(0xD9);
	spi_send_recv(0xF1);

	DISPLAY_ACTIVATE_VBAT;
	quicksleep(10000000);

	spi_send_recv(0xA1);
	spi_send_recv(0xC8);

	spi_send_recv(0xDA);
	spi_send_recv(0x20);

	spi_send_recv(0xAF);
	
}

//sets the buttons 
void btns() 
{

	TRISFSET = 0x2; //Setting button 1, also BTN1
    TRISDSET = 0xf0; //Setting buttons 2-4, also BTN2, BTN3, BTN4
	PORTE = 0x0;
}

/*Timer for subject gravity during game*/
void timer3() 
{
	TMR3 = 0;
	T3CON = 0x70; 
	T3CONSET = 0x8000; 
	PR3 = ((80000000/256) / 100); 

}

/*Timer for obstacles in game*/
void timer4() 
{
	TMR4 = 0;
	T4CON = 0x70; 
	T4CONSET = 0x8000; 
	PR4 = ((80000000/256) / 100); 
}


void user_isr() {
	return;
}


/*Taken from lab3*/
void display_update(void) {
	int i, j, k;
	int c;
	for(i = 0; i < 4; i++) {
		DISPLAY_CHANGE_TO_COMMAND_MODE;
		spi_send_recv(0x22);
		spi_send_recv(i);

		spi_send_recv(0x0);
		spi_send_recv(0x10);

		DISPLAY_CHANGE_TO_DATA_MODE;

		for(j = 0; j < 16; j++) {
			c = textbuffer[i][j];
			if(c & 0x80)
				continue;

			for(k = 0; k < 8; k++)
				spi_send_recv(font[c*8 + k]);
		}
	}
}

/*Taken from lab3*/
void display_string(int line, char *s) {
	int i;
	if(line < 0 || line >= 4)
		return;
	if(!s)
		return;

	for(i = 0; i < 16; i++)
		if(*s) {
			textbuffer[line][i] = *s;
			s++;
		} else
			textbuffer[line][i] = ' ';
}

/*Taken from lab3*/
void clear_text() 
{
    int i, j;

    for (i = 0; i < 4; i++){
  	     for(j = 0; j < 16; j++){
		   textbuffer[i][j] = 0;
	       }
    }
}

/*Taken form lab3, however data adjusted to array*/
void display_image(uint8_t *arr) 
{
    int i, j;

    for(i = 0; i < 4; i++) {
		DISPLAY_CHANGE_TO_COMMAND_MODE;

        spi_send_recv(0x22);
        spi_send_recv(i);

        spi_send_recv(0 & 0xF);
        spi_send_recv(0x10 | ((0 >> 4) & 0xF));

		DISPLAY_CHANGE_TO_DATA_MODE;

        for(j = 0; j < 128; j++) //changed to 128
            spi_send_recv(arr[i * 128 + j]); //changed to 128
    }
}


