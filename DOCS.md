# Dccumentation
Explanation on how to use it
## Canvas with the ID interactive-text
HTML Canvas tag with the ID interactive-text is the base for the library.
See about the HTML Canvas [here](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and more about the IDs [here.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)

The library looks for it. If it finds one, it searches for the following attributes:
- text - **The text to display**
- font-size - **The size of the text**
- color - **The color of text**
- color-h - **The color of the text when it is highlighted**

If it finds them or a number, it applies it to the particles.
The library draws text inside the canvas, picks image data from it (pixel coordinates), and removes the text when the animation starts.

From those pixel coordinates, the library spawns particles inside it. Depending on the font size, it connects the particles like in Particles.js, but this time vannila!
Needed font size of at least 8, or else lag.
## The Library Tag (int-text)
The tag is used if no canvas with the ID interactive-text is found.

If any is found, the library looks for it. If it finds one, it searches for the following attributes:
- width - **The size of the canvas in width**
- height - **The size of the canvas in height**
- text - **The text to display**
- font-size - **The size of the text**
- color - **The color of text**
- color-h - **The color of the text when it is highlighted**

Then, the library puts inside the tag: ```<canvas id="interactive-text"></canvas>```, creating the canvas.
Then, after it applies all of the attributtes to the canvas, the library draws text inside the canvas, picks image data from it (pixel coordinates), and removes the text when the animation starts.

From those pixel coordinates, the library spawns particles inside it. Depending on the font size, it connects the particles like in Particles.js, but this time vannila!
Needed font size of at least 8, or else lag.
