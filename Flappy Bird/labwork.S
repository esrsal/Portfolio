  # labwork.S
  # Written 2015-2017 by F Lundevall
  # Skeleton file for IS1200/IS1500 lab 1.
  # The macros PUSH and POP are in the public domain.
  # Please add your own code at the end of the file.

  #
  # Please keep the two macros PUSH and POP unchanged
  # adjusted by Esra Salman & Nora Say
.global delay 
.macro	PUSH reg
	addi	$sp,$sp,-4
	sw	\reg,0($sp)
.endm

.macro	POP reg
	lw	\reg,0($sp)
	addi	$sp,$sp,4
.endm

  # Please add your own code below this line

.data
.align 2

.text

main:



  # Delay

delay: 	ble		$a0, $0, slut 	
		addi 	$a0, $a0, -1	
	
		add		$t1, $0, $0	
		li		$t0, 3000	

loops:	ble		$t0, $t1, delay	
		addi	$t1, $t1, 1	
		nop
		j 		loops
		nop
	
slut:	jr 		$ra
		nop

  