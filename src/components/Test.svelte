<script>
  import { onMount } from "svelte";
  import { init, uploadCode } from "../core/serial/com";
  let serialName;
  let daemon;
  let chunks = "";

  onMount(async () => {
    const chromeExtensionID = "hfejhkbipnickajaidoppbadcomekkde";
    const actualCode = `
        int simple_loop_variable = 0;
struct RGB {
	int red;
	int green;
	int blue;
};
#include <Adafruit_NeoPixel.h>;
#ifdef __AVR__
	#include <avr/power.h>;
#endif

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(30, 5, NEO_GRB + NEO_KHZ800);



double i = 0;




void setNeoPixelColor(double pos, RGB color) {
	pos = pos <= 0 ? 0 : pos;
	pos = pos >= 1 ? pos - 1 : pos;
	pixels.setPixelColor((int)pos, color.red, color.green, color.blue);
	pixels.show();
}



void setup() {
	pixels.begin();

}


void loop() {
  // A for "count with block" creates a loop where it will
  // stop looping once the variable has reached the "to"
  // point. The best way to learn this block is to drag it
  // out and play around with its values in the simulator.
  for (i = 1; i <= 30; i += 1) {
    // This block will set the color of one led in your neopixel
    // light strip. This block uses 1 as the first neopixel.
    // This block gets the value that the variable is storing.  This variable store a number.
    	setNeoPixelColor(i,{ random(0, 10), random(0, 10), random(0, 10)});
    // This block pauses the Arduino for x number of seconds.
    // Nothing will be able to be sensed while the delay is running.
    delay(200);
  }
  // A for "count with block" creates a loop where it will
  // stop looping once the variable has reached the "to"
  // point. The best way to learn this block is to drag it
  // out and play around with its values in the simulator.
  for (i = 30; i >= 1; i -= 1) {
    // This block will set the color of one led in your neopixel
    // light strip. This block uses 1 as the first neopixel.
    // This block gets the value that the variable is storing.  This variable store a number.
    	setNeoPixelColor(i,{ 0, 0, 0});
    // This block pauses the Arduino for x number of seconds.
    // Nothing will be able to be sensed while the delay is running.
    delay(200);
  }

}
    `;

    const simpleCode = `void setup() {

}

void loop() {

}`;
    try {
      const Daemon = (await import("arduino-create-agent-js-client")).default
        .default;
      init(Daemon);
      setTimeout(async () => {
        await uploadCode(actualCode);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  });
</script>
