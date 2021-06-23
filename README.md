# Int Text
A JS "lib" for interactive text

In the first version, don't expect much, please!

There are two ways of enabling the library: one is with
		
```
<canvas id="interactive-text"></canvas>
```

and the other one is

```
<int-text width="[insert width]" height="[insert height]"></int-text>
```

The library will pick the first that it sees. Only one available for now, working on that! :D
	
There are some special paramters to add to the canvas or int-text:

```
text: The text make the interactive text
font-size: The size of the text (minimum of 8 to add constellation effect (don't need particles.js))
color: Color of the text
color-h: Color of the text with highlight
```
		
Remember to always customize it!

(Add a ```<script defer src="[insert path]">``` tag property to properly include it)
