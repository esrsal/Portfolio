# Flappy Bird

## Overview
This project is a custom implementation of the popular mobile game Flappy Bird, developed for an embedded system using the C programming language. The game is designed to run on hardware equipped with a basic I/O shield, including a small OLED display and physical input buttons. The project was developed as part of a learning exercise in embedded systems programming and understanding hardware-software interaction.
 
## Course
Computer Hardware Engineering, IS1200 at KTH. 

## Project
The project is developed in the C language on a ChipKIT Uno32 board together with a ChipKIT Basic I/O. A Flappy Bird game was selected for developing.

## Installation & Setup
To run the game on your ChipKIT, follow these steps:

1. Download the game repository as a ZIP folder and extract the files.
2. Ensure you have the MCB32TOOLS - MSYS Shell installed on your computer to connect and send files to the ChipKIT.
3. Open the MSYS Shell (bash) and navigate to the folder containing the game's source code.
4. Enter the cross-compile environment by running the following command:
. /opt/mcb32tools/environment
5. Connect your ChipKIT device to your computer.
6. Compile the code using the make command.
7. Install the code on your ChipKIT device with the make install TTYDEV=/dev/ttySX command. Replace the 'X' in /dev/ttySX with the COM number of your device (e.g., /dev/ttyS4).
   
## Project Files
The same files from LAB 3 were used as the foundation for this game. However, to create a fully functional game, only four of the files were modified to include additional necessary functions. Below are the details of these files:

**mipslabfunc.c**
This files contains essential functions for interacting with the OLED display and supporting the game's implementation. It includes functions for clearing the display, writing pixels to the display buffer, handling button inputs, checking collisions, generating pseudo-random numbers, and initializing the game.

**mipslab.h**
This header file contains function declarations, constant definitions, and global variable declarations used throughout the project. It provides the necessary information for other files to use the functions and variables defined in mipslabfunc.c and other files.

**mipslabwork.c**
This file is the main implementation file for the game. It contains the game() function, which is the entry point of the game. It includes calls to functions like subjectform() to initialize the bird and subjectflying() to move the bird according to the player's input.

**mipslabmain.c**
This file is the main driver file that sets up the hardware and initializes the game. It contains the main() function, which initializes the PIC32 microcontroller, sets up the game environment, and calls the game() function from mipslabwork.c to start the game.

## Collaborators
Written by Esra Salman
