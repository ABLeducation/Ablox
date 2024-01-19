#ifndef RDS3_h
#define RDS3_h


Blockly['Arduino'].libraries_['include_motor_library'] =
" #include <inttypes.h>;\n"
Blockly['Arduino'].libraries_['include_motor_library'] =
"#include <Print.h>;\n"
Blockly['Arduino'].libraries_['include_motor_library'] =
"#include <Wire.h>;\n"
Blockly['Arduino'].libraries_['include_motor_library'] =
"#include "Arduino.h"\n';"


enum motor_direction{Clockwise=0, Anticlockwise=1};
enum sensor_type{Analog_IR=0, Ultrasonic=1, Temperature=2, Light=3, Touch=4, Sound=5};


class RDS3 {
public:
/*
  MOTORS:
  1: MOTOR 1
  2: MOTOR 2
  3: MOTOR 3
  4: MOTOR 4

  SENSORS:
    1:ANALOG IR SENSOR
    2:Temprature  SENSOR
    3:LIGHT  SENSOR
    4:TOUCH SENSOR
    5:SOUND SENSOR
    6:ULTRASONIC SENSOR

  SWITCH:
  1:SWITCH 1
  2:SWITCH 2
  3:SWITCH 3
  4:SWITCH 4

   8x2 LCD

   BIZZER

   WAIT

*/


//BIT Defines
    #define BIT0			0x01
    #define BIT1			0x02
    #define BIT2			0x04
    #define BIT3			0x08
    #define BIT4			0x10
    #define BIT5			0x20
    #define BIT6			0x40
    #define BIT7			0x80
    #define CHECKBIT(x,b)	        (x&b)
    #define SETBIT(x,b)		x = x|b
    #define CLEARBIT(x,b) 	        x = x&(~b)
    #define TOGGLEBIT(x,b)	        x = x^b

//LED Toggle Defines
    #define toggle_LED1		TOGGLEBIT(PORTB, BIT6);		//D1
    #define toggle_LED2		TOGGLEBIT(PORTD, BIT0);		//D2
    #define toggle_LED3		TOGGLEBIT(PORTD, BIT1);		//D3
    #define toggle_LED4		TOGGLEBIT(PORTC, BIT1);		//D4

//LED ON Defines
    #define ON_LED1			SETBIT(PORTB, BIT6);		//D1
    #define ON_LED2			SETBIT(PORTD, BIT0);		//D2
    #define ON_LED3			SETBIT(PORTD, BIT1);		//D3
    #define ON_LED4			SETBIT(PORTC, BIT1);		//D4

//LED OFF Defines
    #define OFF_LED1		CLEARBIT(PORTB, BIT6);		//D1
    #define OFF_LED2		CLEARBIT(PORTD, BIT0);		//D2
    #define OFF_LED3		CLEARBIT(PORTD, BIT1);		//D3
    #define OFF_LED4		CLEARBIT(PORTC, BIT1);		//D4


/****************************************** DELAYS ******************************************/

void Delay_MS(int);
void Delay_Sec(int);
void Delay_Min(int);


/****************************************** LCD ******************************************/
void Init_LCD();
void Display_Analog1(int);
void Display_Analog2(int);
void Display_Analog3(int);
void Display_Analog4(int);

void Display_Data(int POS ,   char DATA[16] );

void Display_Variable(int);


/****************************************** MOTOR  ******************************************/

void Motor_Settings();

void Motor_1(char,char);
void Motor_2(char,char);
void Motor_3(char,char);
void Motor_4(char,char);

void Motor_1_OFF();
void Motor_2_OFF();
void Motor_3_OFF();
void Motor_4_OFF();


/********************************* ALL SENSORS *********************************/
void Sensor_Settings();

/********************************* ANALOG IR SENSOR *********************************/

int Sensor_1(char);
int Sensor_2(char);
int Sensor_3(char);
int Sensor_4(char);



/****************************************** SWITCH  ******************************************/
void Switch_Settings();

int Switch_1();
int Switch_2();
int Switch_3();
int Switch_4();

/****************************************** Buzzer  ******************************************/
void Buzzer_Settings();
void Buzzer(int);
void Buzzer_Off();


};

extern RDS3 rds3;

#endif




