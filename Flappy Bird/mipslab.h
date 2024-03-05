/*
Written by Esra Salman
*/

void btns(void);
void timer3(void);
void timer4(void);
void user_isr(void);
void display_init(void);
void display_update(void);
void display_string(int line, char *s);
uint8_t spi_send_recv(uint8_t data);
void px(int x, int y, uint8_t *array);
void clear_text(void);
void clear();
void start(void);
void gamestart(void);
extern const uint8_t const font[128 * 8];
extern char textbuffer[4][16];

