# 📚 Libro Completo: 3D Game Shaders For Beginners: GLSL, Lighting, Bloom, SSAO & Post-Processing

> **Autor:** David Lettier  
> **Fuente Verificada:** `EbookFoundation/free-programming-books` (https://github.com/lettier/3d-game-shaders-for-beginners.git)  
> **Dominio:** `motion_and_animation`  
> **Fecha de Ingesta:** 2026-10-27  

---

## Fuente: `3d-game-shaders-for-beginners/README.md`

<p align="center">
<img src="https://i.imgur.com/x8rtGr4.gif" alt="3D Game Shaders For Beginners" title="3D Game Shaders For Beginners">
</p>

# 3D Game Shaders For Beginners

Interested in adding
textures,
lighting,
shadows,
normal maps,
glowing objects,
ambient occlusion,
reflections,
refractions,
and more to your 3D game?
Great!
Below is a collection of shading techniques that will take your game visuals to new heights.
I've explained each technique in such a way that you can take what you learn here and apply/port it to
whatever stack you use—be it Godot, Unity, Unreal, or something else.
For the glue in between the shaders,
I've chosen the fabulous Panda3D game engine and the OpenGL Shading Language (GLSL).
So if that is your stack, then you'll also get the benefit of learning how to use these
shading techniques with Panda3D and OpenGL specifically.

## Table Of Contents

- [Setup](sections/setup.md)
- [Building The Demo](sections/building-the-demo.md)
- [Running The Demo](sections/running-the-demo.md)
- [Reference Frames](sections/reference-frames.md)
- [GLSL](sections/glsl.md)
- [Render To Texture](sections/render-to-texture.md)
- [Texturing](sections/texturing.md)
- [Lighting](sections/lighting.md)
- [Blinn-Phong](sections/blinn-phong.md)
- [Fresnel Factor](sections/fresnel-factor.md)
- [Rim Lighting](sections/rim-lighting.md)
- [Cel Shading](sections/cel-shading.md)
- [Normal Mapping](sections/normal-mapping.md)
- [Deferred Rendering](sections/deferred-rendering.md)
- [Fog](sections/fog.md)
- [Blur](sections/blur.md)
- [Bloom](sections/bloom.md)
- [SSAO](sections/ssao.md)
- [Motion Blur](sections/motion-blur.md)
- [Chromatic Aberration](sections/chromatic-aberration.md)
- [Screen Space Reflection](sections/screen-space-reflection.md)
- [Screen Space Refraction](sections/screen-space-refraction.md)
- [Foam](sections/foam.md)
- [Flow Mapping](sections/flow-mapping.md)
- [Outlining](sections/outlining.md)
- [Depth Of Field](sections/depth-of-field.md)
- [Posterization](sections/posterization.md)
- [Pixelization](sections/pixelization.md)
- [Sharpen](sections/sharpen.md)
- [Dilation](sections/dilation.md)
- [Film Grain](sections/film-grain.md)
- [Lookup Table (LUT)](sections/lookup-table.md)
- [Gamma Correction](sections/gamma-correction.md)

## License

The included license applies only to the software portion of 3D Game Shaders For Beginners—
specifically the `.cxx`, `.vert`, and `.frag` source code files.
No other portion of 3D Game Shaders For Beginners has been licensed for use.

## Attributions

- [Kiwi Soda Font](https://fontenddev.com/fonts/kiwi-soda/)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

---

## Fuente: `3d-game-shaders-for-beginners/sections/blinn-phong.md`

[:arrow_backward:](lighting.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](fresnel-factor.md)

# 3D Game Shaders For Beginners

## Blinn-Phong

<p align="center">
<img src="https://i.imgur.com/CFWEeGK.gif" alt="Blinn-Phong" title="Blinn-Phong">
</p>

Blinn-Phong is a slight adjustment of the Phong model you saw in the [lighting](lighting.md) section.
It provides more plausible or realistic specular reflections.
You'll notice that Blinn-Phong produces elliptical or elongated specular reflections
versus the spherical specular reflections produced by the Phong model.
In certain cases, Blinn-Phong can be more efficient to calculate than Phong.

```c
  // ...

  vec3 light   = normal(lightPosition.xyz - vertexPosition.xyz);
  vec3 eye     = normalize(-vertexPosition.xyz);
  vec3 halfway = normalize(light + eye);

  // ...
```

Instead of computing the reflection vector,
compute the halfway or half angle vector.
This vector is between the view/camera/eye and light direction vector.

<p align="center">
<img src="https://i.imgur.com/vtqd1Ox.gif" alt="Blinn-Phong vs Phong" title="Blinn-Phong vs Phong">
</p>

```c
    // ...

    float specularIntensity = dot(normal, halfway);

    // ...
```

The specular intensity is now the dot product of the normal and halfway vector.
In the Phong model, it is the dot product of the reflection and view vector.

<p align="center">
<img src="https://i.imgur.com/WZQqxEH.png" alt="Full specular intensity." title="Full specular intensity.">
</p>

The half angle vector (magenta arrow) will point in the same direction as the normal (green arrow) when the
view vector (orange arrow) points in the same direction as the reflection vector (magenta arrow).
In this case, both the Blinn-Phong and Phong specular intensity will be one.

<p align="center">
<img src="https://i.imgur.com/kiSdJzt.png" alt="Blinn-Phong vs Phong" title="Blinn-Phong vs Phong">
</p>

In other cases, the specular intensity for Blinn-Phong will be greater than zero
while the specular intensity for Phong will be zero.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](lighting.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](fresnel-factor.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/bloom.md`

[:arrow_backward:](blur.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](ssao.md)

# 3D Game Shaders For Beginners

## Bloom

<p align="center">
<img src="https://i.imgur.com/UxKRz2r.gif" alt="Bloom" title="Bloom">
</p>

Adding bloom to a scene can really sell the illusion of the lighting model.
Light emitting objects are more believable and specular highlights get an extra dose of shimmer.

```c
  //...

  int   size       = 5;
  float separation = 3;
  float threshold  = 0.4;
  float amount     = 1;

  // ...
```

These parameters control the look and feel.
`size` determines how blurred the effect is.
`separation` spreads out the blur.
`threshold` controls which fragments are illuminated.
And the last parameter, `amount`, controls how much bloom is outputted.

```c
  // ...

  vec2 texSize = textureSize(colorTexture, 0).xy;

  float value = 0.0;
  float count = 0.0;

  vec4 result = vec4(0);
  vec4 color  = vec4(0);

  for (int i = -size; i <= size; ++i) {
    for (int j = -size; j <= size; ++j) {
      // ...
    }
  }

  // ...
```

The technique starts by looping through a kernel/matrix/window centered over the current fragment.
This is similar to the window used for [outlining](outlining.md).
The size of the window is `size * 2 + 1` by `size * 2 + 1`.
So for example, with a `size` setting of two, the window uses `(2 * 2 + 1)^2 = 25` samples per fragment.

```c
      // ...

      color =
        texture
          ( colorTexture
          ,   ( gl_FragCoord.xy
              + (vec2(i, j) * separation)
              )
            / texSize
          );

      value = max(color.r, max(color.g, color.b));
      if (value < threshold) { color = vec4(0); }

      result += color;
      count  += 1.0;

      // ...
```

For each iteration,
it retrieves the color from the input texture and turns the red, green, and blue values into a greyscale value.
If this greyscale value is less than the threshold, it discards this color by making it solid black.
After evaluating the sample's greyscale value, it adds its RGB values to `result`.

```c
  // ...

  result /= count;

  fragColor = mix(vec4(0), result, amount);

  // ...
```

After it's done summing up the samples, it divides the sum of the color samples by the number of samples taken.
The result is the average color of itself and its neighbors.
By doing this for every fragment, you end up with a blurred image.
This form of blurring is known as a [box blur](blur.md#box-blur).

<p align="center">
<img src="https://i.imgur.com/m4yedrM.gif" alt="Bloom progresssion." title="Bloom progresssion.">
</p>

Here you see the progression of the bloom algorithm.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [bloom.frag](../demonstration/shaders/fragment/outline.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](blur.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](ssao.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/blur.md`

[:arrow_backward:](fog.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](bloom.md)

# 3D Game Shaders For Beginners

## Blur

<p align="center">
<img src="https://i.imgur.com/b5vw2AJ.gif" alt="Kuwahara Filter" title="Kuwahara Filter">
</p>

The need to blur this or that can come up quite often as you try to obtain
a particular look or perform some technique like motion blur.
Below are just some of ways you can blur your game's imagery.

### Box Blur

<p align="center">
<img src="https://i.imgur.com/uaXC1JM.gif" alt="Box Blur" title="Box Blur">
</p>

The box blur or mean filter algorithm is a simple to implement blurring effect.
It's fast and gets the job done.
If you need more finesse, you can upgrade to a Gaussian blur.

```c
  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  int size  = int(parameters.x);
  if (size <= 0) { fragColor = texture(colorTexture, texCoord); return; }

  // ...
```

The `size` parameter controls how blurry the result is.
If the `size` is zero or less, return the fragment untouched.

```c
  // ...

  float separation = parameters.y;
        separation = max(separation, 1);

  // ...
```

The `separation` parameter spreads out the blur without having to sample additional fragments.
`separation` ranges from one to infinity.

<p align="center">
<img src="https://i.imgur.com/bRw0OkX.png" alt="Blur Kernel" title="Blur Kernel">
</p>

```c
  // ...

  for (int i = -size; i <= size; ++i) {
    for (int j = -size; j <= size; ++j) {
      // ...
    }
  }

  // ...
```

Like the [outlining](outlining.md) technique,
the box blur technique uses a kernel/matrix/window centered around the current fragment.
The size of the window is `size * 2 + 1` by `size * 2 + 1`.
So for example, with a `size` setting of two, the window uses `(2 * 2 + 1)^2 = 25` samples per fragment.

```c
      // ...

      fragColor +=
        texture
          ( colorTexture
          ,   ( gl_FragCoord.xy
              + (vec2(i, j) * separation)
              )
            / texSize
          );

      // ...
```

To compute the mean or average of the samples in the window,
start by loop through the window, adding up each color vector.


```c
  // ...

  fragColor /= pow(size * 2 + 1, 2);

  // ...
```

To finish computing the mean, divide the sum of the colors sampled by the number of samples taken.
The final fragment color is the mean or average of the fragments sampled inside the window.

### Median Filter

<p align="center">
<img src="https://i.imgur.com/T1nEEn3.gif" alt="Median Filter" title="Median Filter">
</p>

The box blur uses the mean color of the samples taken.
The median filter uses the median color of the samples taken.
By using the median instead of the mean,
the edges in the image are preserved—meaning the edges stay nice and crisp.
For example, look at the windows in the box blurred image versus the median filtered image.

Unfortunately, finding the median can be slower than finding the mean.
You could sort the values and choose the middle one but that would take at least quasilinear time.
There is a technique to find the median in linear time but it can be quite awkward inside a shader.
The numerical approach below approximates the median in linear time.
How well it approximates the median can be controlled.

<p align="center">
<img src="https://i.imgur.com/AnbzUmN.png" alt="Painterly" title="Painterly">
</p>

At lower quality approximations,
you end up with a nice [painterly](https://en.wikipedia.org/wiki/Painterliness) look.

```c
// ...

#define MAX_SIZE        4
#define MAX_KERNEL_SIZE ((MAX_SIZE * 2 + 1) * (MAX_SIZE * 2 + 1))
#define MAX_BINS_SIZE   100

// ...
```

These are the hard limits for the `size` parameter, window size, and `bins` array.


```c
  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  int size = int(parameters.x);
  if (size <= 0) { fragColor = texture(colorTexture, texCoord); return; }
  if (size > MAX_SIZE) { size = MAX_SIZE; }
  int kernelSize = int(pow(size * 2 + 1, 2));

  // ...
```

The `size` parameter controls how blurry or smeared the effect is.
If the size is at or below zero, return the current fragment untouched.
From the `size` parameter, calculate the total size of the kernel or window.
This is how many samples you'll be taking per fragment.

```c
  // ...

  int binsSize = int(parameters.y);
      binsSize = clamp(binsSize, 1, MAX_BINS_SIZE);

  // ...
```

Set up the `binsSize`, making sure to limit it by the `MAX_BINS_SIZE`.

```c
  // ...

  int i        = 0;
  int j        = 0;
  int count    = 0;
  int binIndex = 0;

  // ...
```

`i` and `j` are used to sample the given texture around the current fragment.
`i` is also used as a general for loop count.
`count` is used in the initialization of the `colors` array which you'll see later.
`binIndex` is used to approximate the median color.

```c
  // ...

  vec4  colors[MAX_KERNEL_SIZE];
  float bins[MAX_BINS_SIZE];
  int   binIndexes[colors.length()];

  // ...
```

The `colors` array holds the sampled colors taken from the input texture.
`bins` is used to approximate the median of the sampled colors.
Each bin holds a count of how many colors fall into its range when converting each color into a greyscale value (between zero and one).
As `binsSize` approaches 100, the algorithm finds the true median almost always.
`binIndexes` stores the `bins` index or which bin each sample falls into.

```c
  // ...

  float total = 0;
  float limit = floor(float(kernelSize) / 2) + 1;

  // ...
```

`total` keeps track of how many colors you've come across as you loop through `bins`.
When `total` reaches `limit`, you return whatever `bins` index you're at.
The `limit` is the median index.
For example, if the window size is 81, `limit` is 41 which is directly in the middle (40 samples below and 40 samples above).

```c
  // ...

  float value       = 0;
  vec3  valueRatios = vec3(0.3, 0.59, 0.11);

  // ...
```

These are used to covert and hold each color sample's greyscale value.
Instead of dividing red, green, and blue by one third,
it uses 30% of red, 59% of green, and 11% of blue for a total of 100%.

```c
  // ...

  for (i = -size; i <= size; ++i) {
    for (j = -size; j <= size; ++j) {
      colors[count] =
        texture
          ( colorTexture
          ,   ( gl_FragCoord.xy
              + vec2(i, j)
              )
            / texSize
          );
      count += 1;
    }
  }

  // ...
```

Loop through the window and collect the color samples into `colors`.

```c
  // ...

  for (i = 0; i < binsSize; ++i) {
    bins[i] = 0;
  }

  // ...
```

Initialize the `bins` array with zeros.

```c
  // ...

  for (i = 0; i < kernelSize; ++i) {
    value           = dot(colors[i].rgb, valueRatios);
    binIndex        = int(floor(value * binsSize));
    binIndex        = clamp(binIndex, 0, binsSize - 1);
    bins[binIndex] += 1;
    binIndexes[i]   = binIndex;
  }

  // ...
```

Loop through the colors and convert each one to a greyscale value.
`dot(colors[i].rgb, valueRatios)` is the weighted sum `colors.r * 0.3 + colors.g * 0.59 + colors.b * 0.11`.

Each value will fall into some bin.
Each bin covers some range of values.
For example, if the number of bins is 10, the first bin covers everything from zero up to but not including 0.1.
Increment the number of colors that fall into this bin and remember the color sample's bin index so you can look it up later.

```c
  // ...

  binIndex = 0;

  for (i = 0; i < binsSize; ++i) {
    total += bins[i];
    if (total >= limit) {
      binIndex = i;
      break;
    }
  }

  // ...
```

Loop through the bins, tallying up the number of colors seen so far.
When you reach the median index, exit the loop and remember the last `bins` index reached.

```c
  // ...

  fragColor = colors[0];

  for (i = 0; i < kernelSize; ++i) {
    if (binIndexes[i] == binIndex) {
      fragColor = colors[i];
      break;
    }
  }

  // ...
```

Now loop through the `binIndexes` and find the first color with the last `bins` indexed reached.
Its greyscale value is the approximated median which in many cases will be the true median value.
Set this color as the fragColor and exit the loop and shader.

### Kuwahara Filter

<p align="center">
<img src="https://i.imgur.com/b5vw2AJ.gif" alt="Kuwahara Filter" title="Kuwahara Filter">
</p>

Like the median filter, the kuwahara filter preserves the major edges found in the image.
You'll notice that it has a more block like or chunky pattern to it.
In practice,
the Kuwahara filter runs faster than the median filter, allowing for larger `size` values without a noticeable slowdown.

```c
// ...

#define MAX_SIZE        5
#define MAX_KERNEL_SIZE ((MAX_SIZE * 2 + 1) * (MAX_SIZE * 2 + 1))

// ...
```

Set a hard limit for the `size` parameter and the number of samples taken.

```c
// ...

int i     = 0;
int j     = 0;
int count = 0;

// ...
```

These are used to sample the input texture and set up the `values` array.

```c
// ...

vec3  valueRatios = vec3(0.3, 0.59, 0.11);

// ...
```

Like the median filter, you'll be converting the color samples into greyscale values.

```c
// ...

float values[MAX_KERNEL_SIZE];

// ...
```

Initialize the `values` array.
This will hold the greyscale values for the color samples.

```c
// ...

vec4  color       = vec4(0);
vec4  meanTemp    = vec4(0);
vec4  mean        = vec4(0);
float valueMean   = 0;
float variance    = 0;
float minVariance = -1;

// ...
```

The Kuwahara filter works by computing the variance of four subwindows and then using the mean of the subwindow with the smallest variance.

```c
// ...

void findMean(int i0, int i1, int j0, int j1) {

// ...
```

`findMean` is a function defined outside of `main`.
Each run of `findMean` will remember the mean of the given subwindow that has the lowest variance seen so far.

```c
  // ...

  meanTemp = vec4(0);
  count    = 0;

  // ...
```

Make sure to reset `count` and `meanTemp` before computing the mean of the given subwindow.

```c
  // ...

  for (i = i0; i <= i1; ++i) {
    for (j = j0; j <= j1; ++j) {
      color  =
        texture
          ( colorTexture
          ,   (gl_FragCoord.xy + vec2(i, j))
            / texSize
          );

      meanTemp += color;

      values[count] = dot(color.rgb, valueRatios);

      count += 1;
    }
  }

  // ...
```

Similar to the box blur, loop through the given subwindow and add up each color.
At the same time, make sure to store the greyscale value for this sample in `values`.

```c
  // ...

  meanTemp.rgb /= count;
  valueMean     = dot(meanTemp.rgb, valueRatios);

  // ...
```

To compute the mean, divide the samples sum by the number of samples taken.
Calculate the greyscale value for the mean.

```c
  // ...

  for (i = 0; i < count; ++i) {
    variance += pow(values[i] - valueMean, 2);
  }

  variance /= count;

  // ...
```

Now calculate the variance for this given subwindow.
The variance is the average squared difference between each sample's greyscale value the mean greyscale value.

```c
  // ...

  if (variance < minVariance || minVariance <= -1) {
    mean = meanTemp;
    minVariance = variance;
  }
}

// ...
```

If the variance is smaller than what you've seen before or this is the first variance you've seen,
set the mean of this subwindow as the final mean and update the minimum variance seen so far.

```c
// ...

void main() {
  int size = int(parameters.x);
  if (size <= 0) { fragColor = texture(colorTexture, texCoord); return; }

  // ...
```

Back in `main`, set the `size` parameter.
If the size is at or below zero, return the fragment unchanged.

<p align="center">
<img src="https://i.imgur.com/iuLbLKO.gif" alt="Kuwahara Kernal" title="Kuwahara Kernal">
</p>

```c
  // ...

  // Lower Left

  findMean(-size, 0, -size, 0);

  // Upper Right

  findMean(0, size, 0, size);

  // Upper Left

  findMean(-size, 0, 0, size);

  // Lower Right

  findMean(0, size, -size, 0);

  // ...
```

As stated above,
the Kuwahara filter works by computing the variance of four subwindows
and then using the mean of the subwindow with the lowest variance as the final fragment color.
Note that the four subwindows overlap each other.

```c
  // ...

  mean.a    = 1;
  fragColor = mean;

  // ...
```

After computing the variance and mean for each subwindow,
set the fragment color to the mean of the subwindow with the lowest variance.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [box-blur.frag](../demonstration/shaders/fragment/box-blur.frag)
- [median-filter.frag](../demonstration/shaders/fragment/median-filter.frag)
- [kuwahara-filter.frag](../demonstration/shaders/fragment/kuwahara-filter.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](fog.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](bloom.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/building-the-demo.md`

[:arrow_backward:](setup.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](running-the-demo.md)

# 3D Game Shaders For Beginners

## Building The Demo

<p align="center">
<img src="https://i.imgur.com/PQcDnIu.gif" alt="Building The Demo" title="Building The Demo">
</p>

Before you can try out the demo program, you'll have to build the example code first.

### Dependencies

Before you can compile the example code, you'll need to install
[Panda3D](https://www.panda3d.org/)
for your platform.
Panda3D is available for Linux, Mac, and Windows.

### Linux

Start by [installing](https://www.panda3d.org/manual/?title=Installing_Panda3D_in_Linux) the
[Panda3D SDK](https://www.panda3d.org/download/sdk-1-10-9/) for your distribution.

Make sure to locate where the Panda3D headers and libraries are.
The headers and libraries are most likely in `/usr/include/panda3d/` and `/usr/lib/panda3d/` respectively.

Next clone this repository and change directory into it.

```bash
git clone https://github.com/lettier/3d-game-shaders-for-beginners.git
cd 3d-game-shaders-for-beginners/demonstration
```

Now compile the source code into an object file.

```bash
g++ \
  -c src/main.cxx \
  -o 3d-game-shaders-for-beginners.o \
  -std=gnu++11 \
  -O2 \
  -I/path/to/python/include/ \
  -I/path/to/panda3d/include/
```

With the object file created, create the executable by linking the object file to its dependencies.

```bash
g++ \
  3d-game-shaders-for-beginners.o \
  -o 3d-game-shaders-for-beginners \
  -L/path/to/panda3d/lib \
  -lp3framework \
  -lpanda \
  -lpandafx \
  -lpandaexpress \
  -lpandaphysics \
  -lp3dtoolconfig \
  -lp3dtool \
  -lpthread
```

For more help, see the [Panda3D manual](https://www.panda3d.org/manual/?title=How_to_compile_a_C++_Panda3D_program_on_Linux).

### Mac

Start by installing the [Panda3D SDK](https://www.panda3d.org/download/sdk-1-10-9/) for Mac.

Make sure to locate where the Panda3D headers and libraries are.

Next clone this repository and change directory into it.

```bash
git clone https://github.com/lettier/3d-game-shaders-for-beginners.git
cd 3d-game-shaders-for-beginners
```

Now compile the source code into an object file.
You'll have to find where the Python 2.7 and Panda3D include directories are.

```bash
clang++ \
  -c main.cxx \
  -o 3d-game-shaders-for-beginners.o \
  -std=gnu++11 \
  -g \
  -O2 \
  -I/path/to/python/include/ \
  -I/path/to/panda3d/include/
```

With the object file created, create the executable by linking the object file to its dependencies.
You'll need to track down where the Panda3D libraries are located.

```bash
clang++ \
  3d-game-shaders-for-beginners.o \
  -o 3d-game-shaders-for-beginners \
  -L/path/to/panda3d/lib \
  -lp3framework \
  -lpanda \
  -lpandafx \
  -lpandaexpress \
  -lpandaphysics \
  -lp3dtoolconfig \
  -lp3dtool \
  -lpthread
```

For more help, see the [Panda3D manual](https://www.panda3d.org/manual/?title=How_to_compile_a_C++_Panda3D_program_on_macOS).

### Windows

Start by [installing](https://www.panda3d.org/manual/?title=Installing_Panda3D_in_Windows) the
[Panda3D SDK](https://www.panda3d.org/download/sdk-1-10-9/) for Windows.

Make sure to locate where the Panda3D headers and libraries are.

Next clone this repository and change directory into it.

```bash
git clone https://github.com/lettier/3d-game-shaders-for-beginners.git
cd 3d-game-shaders-for-beginners
```

For more help, see the [Panda3D manual](https://www.panda3d.org/manual/?title=Running_your_Program&language=cxx).

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](setup.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](running-the-demo.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/cel-shading.md`

[:arrow_backward:](rim-lighting.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](normal-mapping.md)

# 3D Game Shaders For Beginners

## Cel Shading

<p align="center">
<img src="https://i.imgur.com/W80Ke1y.gif" alt="Cel Shaded" title="Cel Shaded">
</p>

Cel shading is a technique to make 3D objects look 2D or flat.
In 2D,
you can make an object look 3D by applying a smooth gradient.
However, with cel shading, you're breaking up the gradients into abrupt transitions.
Typically there is only one transition where the shading goes from fully lit to fully shadowed.
When combined with [outlining](outlining.md), cel shading can really sell the 2D cartoon look.

## Diffuse

```c
    // ...

    float diffuseIntensity = max(dot(normal, unitLightDirection), 0.0);
          diffuseIntensity = step(0.1, diffuseIntensity);

    // ...
```

Revisiting the [lighting](lighting.md#diffuse) model,
modify the `diffuseIntensity` such that it is either zero or one.

<p align="center">
<img src="https://i.imgur.com/lyLweFc.png" alt="Step Function" title="Step Function">
</p>

The `step` function returns zero if the input is less than the edge and one otherwise.

<p align="center">
<img src="https://i.imgur.com/EI6QJ60.png" alt="Steps Function" title="Steps Function">
</p>

```c
  // ...

  if      (diffuseIntensity >= 0.8) { diffuseIntensity = 1.0; }
  else if (diffuseIntensity >= 0.6) { diffuseIntensity = 0.6; }
  else if (diffuseIntensity >= 0.3) { diffuseIntensity = 0.3; }
  else                              { diffuseIntensity = 0.0; }

  // ...
```

If you would like to have a few steps or transitions,
you can perform something like the above.

<p align="center">
<img src="https://i.imgur.com/7KK65mi.png" alt="Step Texture" title="Step Texture">
</p>

```c
  // ...

  diffuseIntensity = texture(steps, vec2(diffuseIntensity, 0.0)).r;

  // ...
```

Another approach is to put your step values into a texture with the transitions going from darker to lighter.
Using the `diffuseIntensity` as a U coordinate, it will automatically transform itself.

## Specular

```c

      // ...

      float specularIntensity = clamp(dot(normal, halfwayDirection), 0.0, 1.0);
            specularIntensity = step(0.98, specularIntensity);

      // ...
```

Using the `step` function again, set the `specularIntensity` to be either zero or one.
You can also use one of the other approaches described up above for the specular highlight as well.
After you've altered the `specularIntensity`, the rest of the lighting calculations are the same.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](rim-lighting.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](normal-mapping.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/chromatic-aberration.md`

[:arrow_backward:](motion-blur.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](screen-space-reflection.md)

# 3D Game Shaders For Beginners

## Chromatic Aberration

<p align="center">
<img src="https://i.imgur.com/bawgERm.gif" alt="Chromatic Aberration" title="Chromatic Aberration">
</p>

Chromatic aberration is a screen space technique that simulates lens distortion.
Use it to give your scene a cinematic, lo-fi analog feel or to emphasize a chaotic event.

### Texture

```c
uniform sampler2D colorTexture;

// ...
```

The input texture needed is the scene's colors captured into a framebuffer texture.

### Parameters

<p align="center">
<img src="https://i.imgur.com/fNpMaPL.gif" alt="Chromatic Aberration" title="Chromatic Aberration">
</p>

```c
  // ...

  float redOffset   =  0.009;
  float greenOffset =  0.006;
  float blueOffset  = -0.006;

  // ...
```

The adjustable parameters for this technique are the red, green, and blue offsets.
Feel free to play around with these to get the particular color fringe you're looking for.
These particular offsets produce a yellowish orange and blue fringe.

### Direction

```c
// ...

uniform vec2 mouseFocusPoint;

  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec2 direction = texCoord - mouseFocusPoint;

  // ...
```

The offsets can occur horizontally, vertically, or radially.
One approach is to radiate out from the [depth of field](depth-of-field.md) focal point.
As the scene gets more out of focus, the chromatic aberration increases.

### Samples

```c
// ...

out vec4 fragColor;

  // ...

  fragColor.r  = texture(colorTexture, texCoord + (direction * vec2(redOffset  ))).r;
  fragColor.g  = texture(colorTexture, texCoord + (direction * vec2(greenOffset))).g;
  fragColor.ba = texture(colorTexture, texCoord + (direction * vec2(blueOffset ))).ba;
}
```

With the direction and offsets,
make three samples of the scene's colors—one for the red, green, and blue channels.
These will be the final fragment color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [chromatic-aberration.frag](../demonstration/shaders/fragment/chromatic-aberration.frag)

## Copyright

(C) 2021 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](motion-blur.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](screen-space-reflection.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/deferred-rendering.md`

[:arrow_backward:](normal-mapping.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](fog.md)

# 3D Game Shaders For Beginners

## Deferred Rendering

<p align="center">
<img src="https://i.imgur.com/rxTYLGv.png" alt="Deferred vs Forward" title="Deferred vs Forward">
</p>

Deferred rendering (deferred shading) is a screen space lighting technique.
Instead of calculating the lighting for a scene while you traverse its
geometry—you defer or wait to perform the lighting calculations until
after the scene's geometry fragments have been culled or discarded.
This can give you a performance boost depending on the complexity of your scene.

### Phases

<p align="center">
<img src="https://i.imgur.com/uTimQJj.gif" alt="G-buffer" title="G-buffer">
</p>

Deferred rendering is performed in two phases.
The first phase involves going through the scene's geometry and rendering its
positions or depths,
normals,
and materials
into a framebuffer known as the geometry buffer or G-buffer.
With the exception of some transformations,
this is mostly a read-only phase so its performance cost is minimal.
After this phase, you're only dealing with 2D textures in the shape of the screen.

<p align="center">
<img src="https://i.imgur.com/frYp6to.gif" alt="Lighting Phase" title="Lighting Phase">
</p>

The second and last phase is where you perform your lighting calculations using the output of the first phase.
This is when you calculate the ambient, diffuse, and specular colors.
Shadow and normal mapping are performed in this phase as well.

### Advantages

The reason for using deferred rendering is to reduce the number of lighting calculations made.
With forward rendering, the number of lighting calculations scales with the number of fragments and lights.
However, with deferred shading, the number of lighting calculations scales with the number of pixels and lights.
Recall that for a single pixel, there can be multiple fragments produced.
As you add geometry,
the number of lighting calculations per pixel increases when using forward but not when using deferred.

For simple scenes,
deferred rendering doesn't provide much of a performance boost and may even hurt performance.
However, for complex scenes with lots of lighting, it becomes the better option.
Deferred becomes faster than forward because you're only calculating the lighting per light, per pixel.
In forward rendering,
you're calculating the lighting per light per fragment which can be multiple times per pixel.

### Disadvantages

Deferred rendering allows you render complex scenes using many lights but it does come with its own set of tradeoffs.
Transparency becomes an issue because the geometry data you could see through a semitransparent object is discarded in the first phase.
Other tradesoffs include increased memory consumption due to the G-buffer and the extra workarounds needed to deal with aliasing.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](normal-mapping.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](fog.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/depth-of-field.md`

[:arrow_backward:](outlining.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](posterization.md)

# 3D Game Shaders For Beginners

## Depth Of Field

<p align="center">
<img src="https://i.imgur.com/DEa77Bh.gif" alt="Depth Of Field" title="Depth Of Field">
</p>

Like [SSAO](ssao.md), depth of field is an effect you can't live without once you've used it.
Artistically, you can use it to draw your viewer's eye to a certain subject.
But in general, depth of field adds a lot of realism for a little bit of effort.

### In Focus

The first step is to render your scene completely in focus.
Be sure to render this into a framebuffer texture.
This will be one of the inputs to the depth of field shader.

### Out Of Focus

The second step is to blur the scene as if it was completely out of focus.
Like bloom and SSAO, you can use a [box blur](blur.md#box-blur).
Be sure to render this out-of-focus-scene into a framebuffer texture.
This will be one of the inputs to the depth of field shader.

#### Bokeh

<p align="center">
<img src="https://i.imgur.com/aQ9Ga8J.gif" alt="Bokeh" title="Bokeh">
</p>

For a great bokeh effect, dilate the out of focus texture and use that as the out of focus input.
See [dilation](dilation.md) for more details.

### Mixing

```c
  // ...

  float minDistance = 1.0;
  float maxDistance = 3.0;

  // ...
```

Feel free to tweak these two parameters.
All positions at or below `minDistance` will be completely in focus.
All positions at or beyond `maxDistance` will be completely out of focus.

```c
  // ...

  vec4 focusColor      = texture(focusTexture, texCoord);
  vec4 outOfFocusColor = texture(outOfFocusTexture, texCoord);

  // ...
```

You'll need the in focus and out of focus colors.

```c
  // ...

  vec4 position = texture(positionTexture, texCoord);

  // ...
```

You'll also need the vertex position in view space.
You can reuse the position framebuffer texture you used for [SSAO](ssao.md#vertex-positions).

```c
  // ...

  vec4 focusPoint = texture(positionTexture, mouseFocusPoint);

  // ...
```

The focus point is a position somewhere in your scene.
All of the points in your scene are measured from the focus point.

Choosing the focus point is up to you.
The demo uses the scene position directly under the mouse when clicking the middle mouse button.
However, it could be a constant distance from the camera or a static position.

<p align="center">
<img src="https://i.imgur.com/idDZr62.png" alt="smoothstep" title="smoothstep">
</p>

```c
  // ...

  float blur =
    smoothstep
      ( minDistance
      , maxDistance
      , abs(position.y - focusPoint.y)
      );

  // ...
```

`smoothstep` returns values from zero to one.
The `minDistance` is the left-most edge.
Any position less than the minimum distance, from the focus point, will be in focus or have a blur of zero.
The `maxDistance` is the right-most edge.
Any position greater than the maximum distance, from the focus point, will be out of focus or have a blur or one.
For distances between the edges,
blur will be between zero and one.
These values are interpolated along a s-shaped curve.

```c

  // ...

  fragColor = mix(focusColor, outOfFocusColor, blur);

  // ...
```

The `fragColor` is a mixture of the in focus and out of focus color.
The closer `blur` is to one, the more it will use the `outOfFocusColor`.
Zero `blur` means this fragment is entirely in focus.
At `blur >= 1`, this fragment is completely out of focus.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [box-blur.frag](../demonstration/shaders/fragment/box-blur.frag)
- [depth-of-field.frag](../demonstration/shaders/fragment/depth-of-field.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](outlining.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](posterization.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/dilation.md`

[:arrow_backward:](sharpen.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](film-grain.md)

# 3D Game Shaders For Beginners

## Dilation

<p align="center">
<img src="https://i.imgur.com/z751O74.gif" alt="Dilation" title="Dilation">
</p>

Dilation dilates or enlarges the brighter areas of an image while at the same time,
contracts or shrinks the darker areas of an image.
This tends to create a pillowy look.
You can use dilation for a glow/bloom effect or to add bokeh to your [depth of field](depth-of-field.md).

```c
  // ...

  int   size         = int(parameters.x);
  float separation   =     parameters.y;
  float minThreshold = 0.1;
  float maxThreshold = 0.3;

  // ...
```

The `size` and `separation` parameters control how dilated the image becomes.
A larger `size` will increase the dilation at the cost of performance.
A larger `separation` will increase the dilation at the cost of quality.
The `minThreshold` and `maxThreshold` parameters control which parts of the image become dilated.

```c
  // ...

  vec2 texSize   = textureSize(colorTexture, 0).xy;
  vec2 fragCoord = gl_FragCoord.xy;

  fragColor = texture(colorTexture, fragCoord / texSize);

  // ...
```

Sample the color at the current fragment's position.

```c
  // ...

  float  mx = 0.0;
  vec4  cmx = fragColor;

  for (int i = -size; i <= size; ++i) {
    for (int j = -size; j <= size; ++j) {
      // ...
    }
  }

  // ...
```

Loop through a `size` by `size` window, centered at the current fragment position.
As you loop, find the brightest color based on the surrounding greyscale values.

<p align="center">
<img src="https://i.imgur.com/X3uIyIL.png" alt="Dilation Window" title="Dilation Window">
</p>

```c
      // ...

      // For a rectangular shape.
      //if (false);

      // For a diamond shape;
      //if (!(abs(i) <= size - abs(j))) { continue; }

      // For a circular shape.
      if (!(distance(vec2(i, j), vec2(0, 0)) <= size)) { continue; }

      // ...
```

The window shape will determine the shape of the dilated parts of the image.
For a rectangular shape, you can use every fragment covered by the window.
For any other shape, skip the fragments that fall outside the desired shape.

```c
      // ...

      vec4 c =
        texture
          ( colorTexture
          ,   ( gl_FragCoord.xy
              + (vec2(i, j) * separation)
              )
            / texSize
          );

      // ...
```

Sample a fragment color from the surrounding window.

```c
      // ...

      float mxt = dot(c.rgb, vec3(0.21, 0.72, 0.07));

      // ...
```

Convert the sampled color to a greyscale value.

```c
      // ...

      if (mxt > mx) {
        mx  = mxt;
        cmx = c;
      }

      // ...
```

If the sampled greyscale value is larger than the current maximum greyscale value,
update the maximum greyscale value and its corresponding color.

```c
  // ...

  fragColor.rgb =
    mix
      ( fragColor.rgb
      , cmx.rgb
      , smoothstep(minThreshold, maxThreshold, mx)
      );

  // ...
```

The new fragment color is a mixture between the existing fragment color and
the brightest color found.
If the maximum greyscale value found is less than `minThreshold`,
the fragment color is unchanged.
If the maximum greyscale value is greater than `maxThreshold`,
the fragment color is replaced with the brightest color found.
For any other case,
the fragment color is a mix between the current fragment color and the brightest color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [dilation.frag](../demonstration/shaders/fragment/dilation.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](sharpen.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](film-grain.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/film-grain.md`

[:arrow_backward:](dilation.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](lookup-table.md)

# 3D Game Shaders For Beginners

## Film Grain

<p align="center">
<img src="https://i.imgur.com/ct7mTv5.gif" alt="Film Grain" title="Film Grain">
</p>

Film grain (when applied in subtle doses, unlike here)
can add a bit of realism you don't notice until it's removed.
Typically, it's the imperfections that make a digitally generated image more believable.
In terms of the shader graph, film grain is usually the last effect applied before the game is put on screen.

### Amount

```c
  // ...

  float amount = 0.1;

  // ...
```

The `amount` controls how noticeable the film grain is.
Crank it up for a snowy picture.

### Random Intensity

```c
// ...

uniform float osg_FrameTime;

  //...

  float toRadians = 3.14 / 180;

    //...

    float randomIntensity =
      fract
        ( 10000
        * sin
            (
              ( gl_FragCoord.x
              + gl_FragCoord.y
              * osg_FrameTime
              )
            * toRadians
            )
        );

    // ...
```

This snippet calculates the random intensity needed to adjust the amount.

```c
Time Since F1 = 00 01 02 03 04 05 06 07 08 09 10
Frame Number  = F1    F3    F4       F5 F6
osg_FrameTime = 00    02    04       07 08
```

`osg_FrameTime` is
[provided](https://github.com/panda3d/panda3d/blob/daa57733cb9b4ccdb23e28153585e8e20b5ccdb5/panda/src/display/graphicsStateGuardian.cxx#L930)
by Panda3D.
The frame time is a timestamp of how many seconds have passed since the first frame.
The example code uses this to animate the film grain as `osg_FrameTime` will always be different each frame.

```c

              // ...

              ( gl_FragCoord.x
              + gl_FragCoord.y
              * 8009 // Large number here.

              // ...
```

For static film grain, replace `osg_FrameTime` with a large number.
You may have to try different numbers to avoid seeing any patterns.

<p align="center">
<img src="https://i.imgur.com/xqSIMCb.gif" alt="Horizontal, vertical, and diagonal lines." title="Horizontal, vertical, and diagonal lines.">
</p>

```c
        // ...

        * sin
            (
              ( gl_FragCoord.x
              + gl_FragCoord.y
              * someNumber

              // ...
```

Both the x and y coordinate are used to create points or specs of film grain.
If only x was used, there would only be vertical lines.
Similarly, if only y was used, there would be only horizontal lines.

The reason the snippet multiplies one coordinate by some number is to break up the diagonal symmetry.

<p align="center">
<img src="https://i.imgur.com/4UXllmS.gif" alt="Rain" title="Rain">
</p>

You can of course remove the coordinate multiplier for a somewhat decent looking rain effect.
To animate the rain effect, multiply the output of `sin` by `osg_FrameTime`.

```c
              // ...

              ( gl_FragCoord.x
              + gl_FragCoord.y

              // ...
```

Play around with the x and y coordinate to try and get the rain to change directions.
Keep only the x coordinate for a straight downpour.

```c
input = (gl_FragCoord.x + gl_FragCoord.y * osg_FrameTime) * toRadians
  frame(10000 * sin(input)) =
    fract(10000 * sin(6.977777777777778)) =
      fract(10000 * 0.6400723818964882) =
```

`sin` is used as a hashing function.
The fragment's coordinates are hashed to some output of `sin`.
This has the nice property that no matter the input (big or small), the output range is negative one to one.

```c
fract(10000 * sin(6.977777777777778)) =
  fract(10000 * 0.6400723818964882) =
    fract(6400.723818964882) =
      0.723818964882
```

`sin` is also used as a pseudo random number generator when combined with `fract`.

```python
>>> [floor(fract(4     * sin(x * toRadians)) * 10) for x in range(0, 10)]
[0, 0, 1, 2, 2, 3, 4, 4, 5, 6]

>>> [floor(fract(10000 * sin(x * toRadians)) * 10) for x in range(0, 10)]
[0, 4, 8, 0, 2, 1, 7, 0, 0, 5]
```

Take a look at the first sequence of numbers and then the second.
Each sequence is deterministic but the second sequence has less of a pattern than the first.
So while the output of `fract(10000 * sin(...))` is deterministic, it doesn't have much of a discernible pattern.

<p align="center">
<img src="https://i.imgur.com/Mtt8BNg.gif" alt="Increasing the pseudo randomness." title="Increasing the pseudo randomness.">
</p>

Here you see the `sin` multiplier going from 1, to 10, to 100, and then to 1000.

As you increase the `sin` output multiplier, you get less and less of a pattern.
This is the reason the snippet multiplies `sin` by 10,000.

### Fragment Color

```c
  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 color = texture(colorTexture, texCoord);

  // ...
```

Convert the fragment's coordinates to UV coordinates.
Using these UV coordinates, look up the texture color for this fragment.

```c
    // ...

    amount *= randomIntensity;

    color.rgb += amount;

    // ...
```

Adjust the amount by the random intensity and add this to the color.

```c
  // ...

  fragColor = color;

  // ...
```

Set the fragment color and you're done.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [film-grain.frag](../demonstration/shaders/fragment/film-grain.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](dilation.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](lookup-table.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/flow-mapping.md`

[:arrow_backward:](foam.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](outlining.md)

# 3D Game Shaders For Beginners

## Flow Mapping

<p align="center">
<img src="https://i.imgur.com/3WDO9xW.gif" alt="Flow Mapping" title="Flow Mapping">
</p>

Flow mapping is useful when you need to animate some fluid material.
Much like diffuse maps map UV coordinates to diffuse colors and normal maps map UV coordinates to normals,
flow maps map UV coordinates to 2D translations or flows.

<p align="center">
<img src="https://i.imgur.com/b9Vw94N.png" alt="Flow Map" title="Flow Map">
</p>

Here you see a flow map that maps UV coordinates to translations in the positive y-axis direction.
Flow maps use the red and green channels to store translations in the x and y direction.
The red channel is for the x-axis and the green channel is the y-axis.
Both range from zero to one which translates to flows that range from `(-1, -1)` to `(1, 1)`.
This flow map is all one color consisting of 0.5 red and 0.6 green.

```c
[r, g, b] =
  [r * 2 - 1, g * 2 - 1, b * 2 - 1] =
    [ x, y, z]
```

Recall how the colors in a normal map are converted to actual normals.
There is a similar process for flow maps.

```c
// ...

uniform sampler2D flowTexture;

  vec2 flow = texture(flowTexture, uv).xy;
       flow = (flow - 0.5) * 2;

  // ...
```

To convert a flow map color to a flow,
you minus 0.5 from the channel (red and green) and multiply by two.

```c
(r, g) =
 ( (r - 0.5) * 2
 , (g - 0.5) * 2
 ) =
  ( (0.5 - 0.5) * 2
  , (0.6 - 0.5) * 2
  ) =
    (x, y) =
      (0, 0.2)
```

The flow map above maps each UV coordinate to the flow `(0, 0.2)`.
This indicates zero movement in the x direction and a movement of 0.2 in the y direction.

The flows can be used to translate all sorts of things but they're typically used to
offset the UV coordinates of a another texture.

<p align="center">
<img src="https://i.imgur.com/N6TWBw8.gif" alt="Foam Mask" title="Foam Mask">
</p>

```c
  // ...

  vec2 flow = texture(flowTexture, diffuseCoord).xy;
       flow = (flow - 0.5) * 2;

  vec4 foamPattern =
    texture
      ( foamPatternTexture
      , vec2
          ( diffuseCoord.x + flow.x * osg_FrameTime
          , diffuseCoord.y + flow.y * osg_FrameTime
          )
      );

  // ...
```

For example, the demo program uses a flow map to animate the water.
Here you see the flow map being used to animate the
[foam mask](foam.md#mask).
This continuously moves the diffuse UV coordinates directly up,
giving the foam mask the appearance of moving down stream.

```c
          // ...

          ( diffuseCoord.x + flow.x * osg_FrameTime
          , diffuseCoord.y + flow.y * osg_FrameTime

          // ...
```

You'll need how many seconds have passed since the first frame
in order to animate the UV coordinates in the direction indicated by the flow.
`osg_FrameTime` is
[provided](https://github.com/panda3d/panda3d/blob/daa57733cb9b4ccdb23e28153585e8e20b5ccdb5/panda/src/display/graphicsStateGuardian.cxx#L930)
by Panda3D.
It is a timestamp of how many seconds have passed since the first frame.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [normal.frag](../demonstration/shaders/fragment/normal.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](foam.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](outlining.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/foam.md`

[:arrow_backward:](screen-space-refraction.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](flow-mapping.md)

# 3D Game Shaders For Beginners

## Foam

<p align="center">
<img src="https://i.imgur.com/SVLPYKn.gif" alt="Foam" title="Foam">
</p>

Foam is typically used when simulating some body of water.
Anywhere the water's flow is disrupted, you add some foam.
The foam isn't much by itself but it can really connect the water with the rest of the scene.

<p align="center">
<img src="https://i.imgur.com/HCqvd8c.gif" alt="Lava River" title="Lava River">
</p>

But don't stop at just water.
You can use the same technique to make a river of lava for example.

### Vertex Positions

Like
[screen space refraction](screen-space-refraction.md),
you'll need both the foreground and background vertex positions.
The foreground being the scene with the foamy surface
and the background being the scene without the foamy surface.
Referrer back to [SSAO](ssao.md#vertex-positions) for the details
on how to acquire the vertex positions in view space.

### Mask

<p align="center">
<img src="https://i.imgur.com/N6TWBw8.gif" alt="Foam Mask" title="Foam Mask">
</p>

You'll need to texture your scene with a foam mask.
The demo masks everything off except the water.
For the water, it textures it with a foam pattern.

```c
// ...

uniform sampler2D foamPatternTexture;

in vec2 diffuseCoord;

out vec4 fragColor;

void main() {
  vec4 foamPattern = texture(foamPatternTexture, diffuseCoord);

  fragColor = vec4(vec3(dot(foamPattern.rgb, vec3(1)) / 3), 1);
}
```

Here you see the fragment shader that generates the foam mask.
It takes a foam pattern texture and UV maps it to the scene's geometry using the diffuse UV coordinates.
For every model, except the water, the shader is given a solid black texture as the `foamPatternTexture`.

```c
  // ...

  fragColor = vec4(vec3(dot(foamPattern.rgb, vec3(1)) / 3), 1);

  // ...
```

The fragment color is converted to greyscale,
as a precaution,
since the foam shader expects the foam mask to be greyscale.

### Uniforms

```c
// ...

uniform sampler2D maskTexture;
uniform sampler2D positionFromTexture;
uniform sampler2D positionToTexture;

// ...
```

The foam shader accepts a mask texture,
the foreground vertex positions (`positionFromTexture`),
and the background vertex positions (`positionToTexture`).

### Parameters

```c
  // ...

  float foamDepth = 4;
  vec4  foamColor = vec4(0.8, 0.85, 0.92, 1);

  // ...
```

The adjustable parameters for the foam shader are the foam depth and color.
The foam depth controls how much foam is shown.
As the foam depth increases, the amount of foam shown increases.

### Distance

```c
  // ...

  vec4 positionFrom = texture(positionFromTexture, texCoord);
  vec4 positionTo   = texture(positionToTexture,   texCoord);

  float depth  = (positionTo.xyz - positionFrom.xyz).y;

  // ...
```

Compute the distance from the foreground position to the background position.
Since the positions are in view (camera) space, we only need the y value since it goes into the screen.

### Amount

```c
  // ...

  float amount  = clamp(depth / foamDepth.x, 0, 1);
        amount  = 1 - amount;
        amount *= mask.r;
        amount  = amount * amount / (2 * (amount * amount - amount) + 1);

  // ...
```

The amount of foam is based on the depth, the foam depth parameter, and the mask value.

<p align="center">
<img src="https://i.imgur.com/CDIPmin.png" alt="Easing equation." title="Easing equation.">
</p>

```c
        // ...

        amount  = amount * amount / (2 * (amount * amount - amount) + 1);

        // ...
```

Reshape the amount using the ease in and out easing function.
This will give a lot of foam near depth zero and little to no foam near `foamDepth`.

### Fragment Color

```c
  // ...

  fragColor = mix(vec4(0), foamColor, amount);

  // ...
```

The fragment color is a mix between transparent black and the foam color based on the amount.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [foam-mask.frag](../demonstration/shaders/fragment/foam-mask.frag)
- [foam.frag](../demonstration/shaders/fragment/foam.frag)
- [base-combine.frag](../demonstration/shaders/fragment/base-combine.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](screen-space-refraction.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](flow-mapping.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/fog.md`

[:arrow_backward:](deferred-rendering.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](blur.md)

# 3D Game Shaders For Beginners

## Fog

<p align="center">
<img src="https://i.imgur.com/uNRxZl4.gif" alt="Fog" title="Fog">
</p>

Fog (or mist as it's called in Blender) adds atmospheric haze to a scene,
providing mystique and softening pop-ins (geometry suddenly entering into the camera's frustum).

```c
// ...

uniform vec4 color;

uniform vec2 nearFar;

// ...
```

To calculate the fog, you'll need its color, near distance, and far distance.

```c
// ...

uniform sampler2D positionTexture;

  // ...

  vec2 texSize  = textureSize(positionTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 position = texture(positionTexture, texCoord);

  // ...
```

In addition to the fog's attributes, you'll also need the fragment's vertex `position`.

```c
  float fogMin = 0.00;
  float fogMax = 0.97;
```

`fogMax` controls how much of the scene is still visible when the fog is most intense.
`fogMin` controls how much of the fog is still visible when the fog is least intense.

```c
  // ...

  float near = nearFar.x;
  float far  = nearFar.y;

  float intensity =
    clamp
      (   (position.y - near)
        / (far        - near)
      , fogMin
      , fogMax
      );

  // ...
```

The example code uses a linear model for calculating the fog's intensity.
There's also an exponential model you could use.

The fog's intensity is `fogMin` before or at the start of the fog's `near` distance.
As the vertex `position` gets closer to the end of the fog's `far` distance, the `intensity` moves closer to `fogMax`.
For any vertexes after the end of the fog, the `intensity` is clamped to `fogMax`.

```c
  // ...

  fragColor = vec4(color.rgb, intensity);

  // ...
```

Set the fragment's color to the fog `color` and the fragment's alpha channel to the `intensity`.
As `intensity` gets closer to one, you'll have less of the scene's color and more of the fog color.
When `intensity` reaches one, you'll have all fog color and nothing else.

```c
// ...

uniform sampler2D baseTexture;
uniform sampler2D fogTexture;

  // ...

  vec2 texSize  = textureSize(baseTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 baseColor = texture(baseTexture, texCoord);
  vec4 fogColor  = texture(fogTexture,  texCoord);

  fragColor = baseColor;

  // ...

  fragColor = mix(fragColor, fogColor, min(fogColor.a, 1));

  // ...
```

Normally you calculate the fog in the same shader that does the lighting calculations.
However, you can also break it out into its own framebuffer texture.
Here you see the fog color being applied to the rest of the scene much like you would apply a layer in GIMP.
This allows you to calculate the fog once instead calculating it in every shader that eventually needs it.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [normal.frag](../demonstration/shaders/fragment/normal.frag)
- [fog.frag](../demonstration/shaders/fragment/fog.frag)
- [outline.frag](../demonstration/shaders/fragment/outline.frag)
- [scene-combine.frag](../demonstration/shaders/fragment/scene-combine.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](deferred-rendering.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](blur.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/fresnel-factor.md`

[:arrow_backward:](blinn-phong.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](rim-lighting.md)

# 3D Game Shaders For Beginners

## Fresnel Factor

<p align="center">
<img src="https://i.imgur.com/3lQL51m.gif" alt="Fresnel" title="Fresnel">
</p>

The fresnel factor alters the reflectiveness of a surface based on the camera or viewing angle.
As a surface points away from the camera, its reflectiveness goes up.
Similarly, as a surface points towards the camera, its reflectiveness goes down.

<p align="center">
<img src="https://i.imgur.com/WolRRhX.png" alt="" title="">
</p>

In other words, as a surface becomes perpendicular with the camera, it becomes more mirror like.
Utilizing this property, you can vary the opacity of reflections
(such as [specular](lighting.md#specular) and [screen space reflections](screen-space-reflection.md))
and/or vary a surface's alpha values for a more plausible or realistic look.

### Specular Reflection

<p align="center">
<img src="https://i.imgur.com/FnOhXxv.gif" alt="Specular Intensity" title="Specular Intensity">
</p>

```c
  vec4 specular =   materialSpecularColor
                  * lightSpecularColor
                  * pow(max(dot(eye, reflection), 0.0), shininess);
```

In the [lighting](lighting.md#specular) section,
the specular component was a combination of the
material's specular color,
the light's specular color,
and by how much the camera pointed into the light's reflection direction.
Incorporating the fresnel factor,
you'll now vary the material specular color based on the angle between the camera and the surface it's pointed at.

```c
  // ...

  vec3 eye = normalize(-vertexPosition.xyz);

  // ...
```

The first vector you'll need is the eye/view/camera vector.
Recall that the eye vector points from the vertex position to the camera's position.
If the vertex position is in view or camera space,
the eye vector is the vertex position pointed in the opposite direction.

```c
  // ...

  vec3 light   = normal(lightPosition.xyz - vertexPosition.xyz);
  vec3 halfway = normalize(light + eye);

  // ...
```

The fresnel factor is calculated using two vectors.
The simplest two vectors to use are the eye and normal vector.
However, if you're using the halfway vector (from the [Blinn-Phong](blinn-phong.md) section),
you can instead calculate the fresnel factor using the halfway and eye vector.

```c

  // ...

  float fresnelFactor = dot(halfway, eye); // Or dot(normal, eye).
        fresnelFactor = max(fresnelFactor, 0.0);
        fresnelFactor = 1.0 - fresnelFactor;
        fresnelFactor = pow(fresnelFactor, fresnelPower);

  // ...
```

With the needed vectors in hand,
you can now compute the fresnel factor.
The fresnel factor ranges from zero to one.
When the dot product is one,
the fresnel factor is zero.
When the dot product is less than or equal to zero,
the fresnel factor is one.
This equation comes from
[Schlick's approximation](https://en.wikipedia.org/wiki/Schlick%27s_approximation).

<p align="center">
<img src="https://i.imgur.com/AAFI8p1.gif" alt="Fresnel Power" title="Fresnel Power">
</p>

In Schlick's approximation,
the `fresnelPower` is five but you can alter this to your liking.
The demo code varies it using the blue channel of the specular map with a maximum value of five.

```c
  // ...

  materialSpecularColor.rgb = mix(materialSpecularColor.rgb, vec3(1.0), fresnelFactor);

  // ...
```

Once the fresnel factor is determined,
use it to modulate the material's specular color.
As the fresnel factor approaches one,
the material becomes more like a mirror or fully reflective.

```c
  // ...

  vec4 specular      = vec4(vec3(0.0), 1.0);
       specular.rgb  =   materialSpecularColor.rgb
                       * lightSpecularColor.rgb
                       * pow
                          ( max(dot(normal, halfway), 0.0) // Or max(dot(reflection, eye), 0.0).
                          , shininess
                          );

  // ...
```

As before,
the specular component is a combination of the
material's specular color,
the light's specular color,
and by how much the camera points into the direction of the light's reflection.
However,
using the fresnel factor,
the material's specular color various depending on the orientation of the camera and the surface it's looking at.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](blinn-phong.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](rim-lighting.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/gamma-correction.md`

[:arrow_backward:](lookup-table.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](setup.md)

# 3D Game Shaders For Beginners

## Gamma Correction

<p align="center">
<img src="https://i.imgur.com/IG7A6cj.gif" alt="Gamma Correction" title="Gamma Correction">
</p>

Correcting for gamma will make your color calculations look correct.
This isn't to say they'll look amazing but with gamma correction,
you'll find that the colors meld together better,
the shadows are more nuanced,
and the highlights are more subtle.
Without gamma correction,
the shadowed areas tend to get crushed while the highlighted areas tend to get blown-out and
over saturated making for a harsh contrast overall.

If you're aiming for realism,
gamma correction is especially important.
As you perform more and more calculations,
the tiny errors add up making it harder to achieve photorealism.
The equations will be correct but the inputs and outputs will be wrong leaving you frustrated.

It's easy to get twisted around when thinking about gamma correction
but essentially it boils down to knowing what color space a color is in and how to convert that color to the color space you need.
With those two pieces of the puzzle,
gamma correction becomes a tedious yet simple chore you'll have to perform from time to time.

### Color Spaces

<p align="center">
<img src="https://i.imgur.com/a1U5oBq.png" alt="sRGB vs RGB" title="sRGB vs RGB">
</p>

The two color spaces you'll need to be aware of are sRGB (standard Red Green Blue) and RGB or linear color space.

```bash
identify -format "%[colorspace]\n" house-diffuse-srgb.png
sRGB

identify -format "%[colorspace]\n" house-diffuse-rgb.png
RGB
```

Knowing what color space a color texture is in will determine how you handle it in your shaders.
To determine the color space of a texture, use ImageMagick's `identify`.
You'll find that most textures are in sRGB.

```bash
convert house-diffuse-srgb -colorspace rgb house-diffuse-rgb.png
```

To convert a texture to a particular color space, use ImageMagick's `convert` program.
Notice how a texture is darkened when transforming from sRGB to RGB.

### Decoding


The red, green, and blue values in a sRGB color texture are encoded and cannot be modified directly.
Modifying them directly would be like running spellcheck on an encrypted message.
Before you can run spellcheck,
you first have to decrypt the message.
Similarly,
to modify the values of an sRGB texture,
you first have to decode or transform them to RGB or linear color space.

```c
  // ...

  color     = texture(color_texture, uv);
  color.rgb = pow(color.rgb, 2.2);

  // ...
```

To decode a sRGB encoded color,
raise the `rgb` values to the power of `2.2`.
Once you have decoded the color,
you are now free to add, subtract, multiply, and divide it.

By raising the color values to the power of `2.2`,
you're converting them from sRGB to RGB or linear color space.
This conversion has the effect of darkening the colors.

<p align="center">
<img src="https://i.imgur.com/E5nkRfG.png" alt="Color Darkening" title="Color Darkening">
</p>

For example,
`vec3(0.9, 0.2, 0.3)` becomes `vec3(0.793, 0.028, 0.07)`.

<p align="center">
<img src="https://i.imgur.com/TOEb0EC.gif" alt="Gamma Curves" title="Gamma Curves">
</p>

The `2.2` value is known as gamma.
Loosely speaking, gamma can either be `1.0 / 2.2`, `2.2`, or `1.0`.
As you've seen, `2.2` is for decoding sRGB encoded color textures.
As you will see, `1.0 / 2.2` is for encoding linear or RGB color textures.
And `1.0` is RGB or linear color space since `y = 1 * x + 0` and
any base raised to the power of `1.0` is itself.

#### Non-color Data

<p align="center">
<img src="https://i.imgur.com/reA2qjs.png" alt="Non-color Data" title="Non-color Data">
</p>

One important exception to decoding is when the "colors" of a texture represent non-color data.
Some examples of non-color data would be the normals in a normal map,
the alpha channel,
the heights in a height map,
and the directions in a flow map.
Only decode color related data or data that represents color.
When dealing with non-color data,
treat the sRGB color values as RGB or linear and skip the decoding process.

### Encoding

<p align="center">
<img src="https://i.imgur.com/tRxkKNe.gif" alt="Perceptually versus Actually Linear" title="Perceptually versus Actually Linear">
</p>

The necessity for encoding and decoding stems from the fact that humans do not perceive lightness linearly and
most displays (like a monitor) lack the precision or number of bits to accurately show both lighter and darker tonal values or shades.
With only so many bits to go around,
colors are encoded in such a way that more bits are devoted to the darker shades than the lighter shades
since humans are more sensitive to darker tones than lighter tones.
Encoding it this way uses the limited number of bits more effectively for human perception.
Still, the only thing to remember is that your display is expecting sRGB encoded values.
Therefore, if you decoded a sRGB value, you have to encode it before it makes its way to your display.

```c
  // ...

  color     = texture(color_texture, uv);
  color.rgb = pow(color.rgb, 1.0 / 2.2);

  // ...
```

To encode a linear value or convert RGB to sRGB,
raise the `rgb` values to the power of `1.0 / 2.2`.
Notice how `1.1 / 2.2` is the reciprocal of `2.2` or `2.2 / 1.0`.
Here you see the symmetry in decoding and encoding.

<p align="center">
<img src="https://i.imgur.com/4km0pdv.gif" alt="Not Gamma Corrected versus Gamma Corrected" title="Not Gamma Corrected versus Gamma Corrected">
</p>

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [gamma-correction.frag](../demonstration/shaders/fragment/gamma-correction.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](lookup-table.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](setup.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/glsl.md`

[:arrow_backward:](reference-frames.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](render-to-texture.md)

# 3D Game Shaders For Beginners

## GLSL

<p align="center">
<img src="https://i.imgur.com/7b5MCBG.gif" alt="" title="">
</p>

Instead of using the
[fixed-function](https://en.wikipedia.org/wiki/Fixed-function)
pipeline,
you'll be using the programmable GPU rendering pipeline.
Since it is programmable, it is up to you to supply the programming in the form of shaders.
A shader is a (typically small) program you write using a syntax reminiscent of C.
The programmable GPU rendering pipeline has various different stages that you can program with shaders.
The different types of shaders include vertex, tessellation, geometry, fragment, and compute.
You'll only need to focus on the vertex and fragment stages for the techniques below.

```c
#version 150

void main() {}
```

Here is a bare-bones GLSL shader consisting of the GLSL version number and the main function.

```c
#version 150

uniform mat4 p3d_ModelViewProjectionMatrix;

in vec4 p3d_Vertex;

void main()
{
  gl_Position = p3d_ModelViewProjectionMatrix * p3d_Vertex;
}
```

Here is a stripped down GLSL vertex shader that transforms an incoming vertex to clip space
and outputs this new position as the vertex's homogeneous position.
The `main` procedure doesn't return anything since it is `void` and the `gl_Position` variable is a built-in output.

Take note of the keywords `uniform` and `in`.
The `uniform` keyword means this global variable is the same for all vertexes.
Panda3D sets the `p3d_ModelViewProjectionMatrix` for you and it is the same matrix for each vertex.
The `in` keyword means this global variable is being given to the shader.
The vertex shader receives each vertex that makes up the geometry the vertex shader is attached to.

```c
#version 150

out vec4 fragColor;

void main() {
  fragColor = vec4(0, 1, 0, 1);
}
```

Here is a stripped down GLSL fragment shader that outputs the fragment color as solid green.
Keep in mind that a fragment affects at most one screen pixel but a single pixel can be affected by many fragments.

Take note of the `out` keyword.
The `out` keyword means this global variable is being set by the shader.
The name `fragColor` is arbitrary so feel free to choose a different one.

<p align="center">
<img src="https://i.imgur.com/V25UzMa.gif" alt="Output of the stripped down shaders." title="Output of the stripped down shaders.">
</p>

This is the output of the two shaders shown above.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](reference-frames.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](render-to-texture.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/lighting.md`

[:arrow_backward:](texturing.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](blinn-phong.md)

# 3D Game Shaders For Beginners

## Lighting

<p align="center">
<img src="https://i.imgur.com/zQrA8tr.gif" alt="Lighting" title="Lighting">
</p>

Completing the lighting involves calculating and combining the ambient, diffuse, specular, and emission light aspects.
The example code uses either Phong or Blinn-Phong lighting.

### Vertex

```c
// ...

uniform struct p3d_LightSourceParameters
  { vec4 color

  ; vec4 ambient
  ; vec4 diffuse
  ; vec4 specular

  ; vec4 position

  ; vec3  spotDirection
  ; float spotExponent
  ; float spotCutoff
  ; float spotCosCutoff

  ; float constantAttenuation
  ; float linearAttenuation
  ; float quadraticAttenuation

  ; vec3 attenuation

  ; sampler2DShadow shadowMap

  ; mat4 shadowViewMatrix
  ;
  } p3d_LightSource[NUMBER_OF_LIGHTS];

// ...
```

For every light, minus the ambient light, Panda3D gives you this convenient
struct which is available to both the vertex and fragment shaders.
The biggest convenience being the shadow map and shadow view matrix for transforming vertexes to shadow or light space.

```c
  // ...

  vertexPosition = p3d_ModelViewMatrix * p3d_Vertex;

  // ...

  for (int i = 0; i < p3d_LightSource.length(); ++i) {
    vertexInShadowSpaces[i] = p3d_LightSource[i].shadowViewMatrix * vertexPosition;
  }

  // ...
```

Starting in the vertex shader, you'll need to transform and
output the vertex from view space to shadow or light space for each light in your scene.
You'll need this later in the fragment shader in order to render the shadows.
Shadow or light space is where every coordinate is relative to the light position (the light is the origin).

### Fragment

The fragment shader is where most of the lighting calculations take place.

#### Material

```c
// ...

uniform struct
  { vec4 ambient
  ; vec4 diffuse
  ; vec4 emission
  ; vec3 specular
  ; float shininess
  ;
  } p3d_Material;

// ...
```

Panda3D gives us the material (in the form of a struct) for the mesh or model you are currently rendering.

#### Multiple Lights

```c
  // ...

  vec4 diffuse  = vec4(0.0, 0.0, 0.0, diffuseTex.a);
  vec4 specular = vec4(0.0, 0.0, 0.0, diffuseTex.a);

  // ...
```

Before you loop through the scene's lights, create an accumulator for both the diffuse and specular colors.

```c
  // ...

  for (int i = 0; i < p3d_LightSource.length(); ++i) {
    // ...
  }

  // ...
```

Now you can loop through the lights, calculating the diffuse and specular colors for each one.

#### Light Related Vectors

<p align="center">
<img src="https://i.imgur.com/0pzNh5d.gif" alt="Phong Lighting Model" title="Phong Lighting Model">
</p>

Here you see the four major vectors you'll need to calculate the diffuse and specular colors contributed by each light.
The light direction vector is the light blue arrow pointing to the light.
The normal vector is the green arrow standing straight up.
The reflection vector is the dark blue arrow mirroring the light direction vector.
The eye or view vector is the orange arrow pointing towards the camera.

```c
    // ...

    vec3 lightDirection =
        p3d_LightSource[i].position.xyz
      - vertexPosition.xyz
      * p3d_LightSource[i].position.w;

    // ...
```

The light direction is from the vertex's position to the light's position.

Panda3D sets `p3d_LightSource[i].position.w` to zero if this is a directional light.
Directional lights do not have a position as they only have a direction.
So if this is a directional light,
the light direction will be the negative or opposite direction of the light as Panda3D sets
`p3d_LightSource[i].position.xyz` to be `-direction` for directional lights.

```c
  // ...

  normal = normalize(vertexNormal);

  // ...
```

You'll need the vertex normal to be a unit vector.
Unit vectors have a length of magnitude of one.

```c
    // ...

    vec3 unitLightDirection = normalize(lightDirection);
    vec3 eyeDirection       = normalize(-vertexPosition.xyz);
    vec3 reflectedDirection = normalize(-reflect(unitLightDirection, normal));

    // ...
```

Next you'll need three more vectors.

You'll need to take the dot product involving the light direction so its best to normalize it.
This gives it a distance or magnitude of one (unit vector).

The eye direction is the opposite of the vertex/fragment position since the vertex/fragment position is relative to the camera's position.
Remember that the vertex/fragment position is in view space.
So instead of going from the camera (eye) to the vertex/fragment, you go from the vertex/fragment to the eye (camera).

The
[reflection vector](http://asawicki.info/news_1301_reflect_and_refract_functions.html)
is a reflection of the light direction at the surface normal.
As the light "ray" hits the surface, it bounces off at the same angle it came in at.
The angle between the light direction vector and the normal is known as the "angle of incidence".
The angle between the reflection vector and the normal is known as the "angle of reflection".

You'll have to negate the reflected light vector as it needs to point in the same direction as the eye vector.
Remember the eye direction is from the vertex/fragment to the camera position.
You'll use the reflection vector to calculate the intensity of the specular highlight.

#### Diffuse

```c
    // ...

    float diffuseIntensity  = dot(normal, unitLightDirection);

    if (diffuseIntensity < 0.0) { continue; }

    // ...
```

The diffuse intensity is the dot product between the surface normal and the unit vector light direction.
The dot product can range from negative one to one.
If both vectors point in the same direction, the intensity is one.
Any other case will be less than one.

<p align="center">
<img src="https://i.imgur.com/Nb78z96.gif" alt="The light direction versus the normal direction." title="The light direction versus the normal direction.">
</p>

As the light vector approaches the same direction as the normal, the diffuse intensity approaches one.

```c
    // ...

    if (diffuseIntensity < 0.0) { continue; }

    // ...
```

If the diffuse intensity is zero or less, move on to the next light.

```c
    // ...

    vec4 diffuseTemp =
      vec4
        ( clamp
            (   diffuseTex.rgb
              * p3d_LightSource[i].diffuse.rgb
              * diffuseIntensity
            , 0
            , 1
            )
        , diffuseTex.a
        );

    diffuseTemp = clamp(diffuseTemp, vec4(0), diffuseTex);

    // ...
```

You can now calculate the diffuse color contributed by this light.
If the diffuse intensity is one, the diffuse color will be a mix between the diffuse texture color and the lights color.
Any other intensity will cause the diffuse color to be darker.

Notice how I clamp the diffuse color to be only as bright as the diffuse texture color is.
This will protect the scene from being over exposed.
When creating your diffuse textures, make sure to create them as if they were fully lit.

#### Specular

After diffuse, comes specular.

<p align="center">
<img src="https://i.imgur.com/FnOhXxv.gif" alt="Specular Intensity" title="Specular Intensity">
</p>

```c
    // ...

    float specularIntensity = max(dot(reflectedDirection, eyeDirection), 0);

    vec4 specularTemp =
      clamp
        (   vec4(p3d_Material.specular, 1)
          * p3d_LightSource[i].specular
          * pow
              ( specularIntensity
              , p3d_Material.shininess
              )
        , 0
        , 1
        );

    // ...
```

The specular intensity is the dot product between the eye vector and the reflection vector.
As with the diffuse intensity, if the two vectors point in the same direction, the specular intensity is one.
Any other intensity will diminish the amount of specular color contributed by this light.

<p align="center">
<img src="https://i.imgur.com/4r6wqLP.gif" alt="Shininess" title="Shininess">
</p>

The material shininess determines how spread out the specular highlight is.
This is typically set in a modeling program like Blender.
In Blender it's known as the specular hardness.

#### Spotlights

```c
    // ...

    float unitLightDirectionDelta =
      dot
        ( normalize(p3d_LightSource[i].spotDirection)
        , -unitLightDirection
        );

    if (unitLightDirectionDelta < p3d_LightSource[i].spotCosCutoff) { continue; }

    // ...
}
```

This snippet keeps fragments outside of a spotlight's cone or frustum from being affected by the light.
Fortunately, Panda3D
[sets up](https://github.com/panda3d/panda3d/blob/daa57733cb9b4ccdb23e28153585e8e20b5ccdb5/panda/src/display/graphicsStateGuardian.cxx#L1705)
`spotDirection` and `spotCosCutoff` to also work for directional lights and points lights.
Spotlights have both a position and direction.
However, directional lights only have a direction and point lights only have a position.
Still, this code works for all three lights avoiding the need for noisy if statements.

```c
        // ...

        , -unitLightDirection

        // ...
```

You must negate `unitLightDirection`.
`unitLightDirection` goes from the fragment to the spotlight and you need it to go from the spotlight to the fragment
since the `spotDirection` goes directly down the center of the spotlight's frustum some distance away from the spotlight's position.

```c
spotCosCutoff = cosine(0.5 * spotlightLensFovAngle);
```

For a spotlight, if the dot product between the fragment-to-light vector and the spotlight's direction vector is less than the cosine
of half the spotlight's field of view angle, the shader disregards this light's influence.

For directional lights and point lights, Panda3D sets `spotCosCutoff` to negative one.
Recall that the dot product ranges from negative one to one.
So it doesn't matter what the `unitLightDirectionDelta` is because it will always be greater than or equal to negative one.

```c
    // ...

    diffuseTemp *= pow(unitLightDirectionDelta, p3d_LightSource[i].spotExponent);

    // ...
```

Like the `unitLightDirectionDelta` snippet, this snippet also works for all three light types.
For spotlights, this will make the fragments brighter as you move closer to the center of the spotlight's frustum.
For directional lights and point lights, `spotExponent` is zero.
Recall that anything to the power of zero is one so the diffuse color is one times itself meaning it is unchanged.

#### Shadows

```c
    // ...

    float shadow =
      textureProj
        ( p3d_LightSource[i].shadowMap
        , vertexInShadowSpaces[i]
        );

    diffuseTemp.rgb  *= shadow;
    specularTemp.rgb *= shadow;

    // ...
```

Panda3D makes applying shadows relatively easy by providing the shadow map and shadow transformation matrix for every scene light.
To create the shadow transformation matrix yourself,
you'll need to assemble a matrix that transforms view space coordinates to light space (coordinates are relative to the light's position).
To create the shadow map yourself, you'll need to render the scene from the perspective of the light to a framebuffer texture.
The framebuffer texture must hold the distances from the light to the fragments.
This is known as a "depth map".
Lastly, you'll need to manually give to your shader your DIY depth map as a `uniform sampler2DShadow`
and your DIY shadow transformation matrix as a `uniform mat4`.
At this point, you've recreated what Panda3D does for you automatically.

The shadow snippet shown uses `textureProj` which is different from the `texure` function shown earlier.
`textureProj` first divides `vertexInShadowSpaces[i].xyz` by `vertexInShadowSpaces[i].w`.
After this, it uses `vertexInShadowSpaces[i].xy` to locate the depth stored in the shadow map.
Next it uses `vertexInShadowSpaces[i].z` to compare this vertex's depth against the shadow map depth at
`vertexInShadowSpaces[i].xy`.
If the comparison passes, `textureProj` will return one.
Otherwise, it will return zero.
Zero meaning this vertex/fragment is in the shadow and one meaning this vertex/fragment is not in the shadow.

`textureProj` can also return a value between zero and one depending on how the shadow map was set up.
In this instance, `textureProj` performs multiple depth tests using neighboring depth values and returns a weighted average.
This weighted average can give shadows a softer look.

#### Attenuation

<p align="center">
<img src="https://i.imgur.com/jyatr7l.png" alt="Attenuation" title="Attenuation">
</p>

```c
    // ...

    float lightDistance = length(lightDirection);

    float attenuation =
        1
      / ( p3d_LightSource[i].constantAttenuation
        + p3d_LightSource[i].linearAttenuation
        * lightDistance
        + p3d_LightSource[i].quadraticAttenuation
        * (lightDistance * lightDistance)
        );

    diffuseTemp.rgb  *= attenuation;
    specularTemp.rgb *= attenuation;

    // ...
```

The light's distance is just the magnitude or length of the light direction vector.
Notice it's not using the normalized light direction as that distance would be one.

You'll need the light distance to calculate the attenuation.
Attenuation meaning the light's influence diminishes as you get further away from it.

You can set `constantAttenuation`, `linearAttenuation`, and `quadraticAttenuation` to whatever values you would like.
A good starting point is `constantAttenuation = 1`, `linearAttenuation = 0`, and `quadraticAttenuation = 1`.
With these settings, the attenuation is one at the light's position and approaches zero as you move further away.

#### Final Light Color

```c
    // ...

    diffuse  += diffuseTemp;
    specular += specularTemp;

    // ...
```

To calculate the final light color, add the diffuse and specular together.
Be sure to add this to the accumulator as you loop through the scene's lights.

#### Ambient

```c
// ...

uniform sampler2D p3d_Texture1;

// ...

uniform struct
  { vec4 ambient
  ;
  } p3d_LightModel;

// ...

in vec2 diffuseCoord;

  // ...

  vec4 diffuseTex  = texture(p3d_Texture1, diffuseCoord);

  // ...

  vec4 ambient = p3d_Material.ambient * p3d_LightModel.ambient * diffuseTex;

// ...
```

The ambient component to the lighting model is based on the material's ambient color,
the ambient light's color, and the diffuse texture color.

There should only ever be one ambient light.
Because of this, the ambient color calculation only needs to occur once.
Contrast this with the diffuse and specular color which must be accumulated for each spot/directional/point light.
When you reach [SSAO](ssao.md), you'll revisit the ambient color calculation.

#### Putting It All Together

```c
  // ...

  vec4 outputColor = ambient + diffuse + specular + p3d_Material.emission;

  // ...
```

The final color is the sum of the ambient color, diffuse color, specular color, and the emission color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](texturing.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](blinn-phong.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/lookup-table.md`

[:arrow_backward:](film-grain.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](gamma-correction.md)

# 3D Game Shaders For Beginners

## Lookup Table (LUT)

<p align="center">
<img src="https://i.imgur.com/WrPzVlW.gif" alt="LUT" title="LUT">
</p>

The lookup table or LUT shader allows you to transform the colors of your game
using an image editor like the [GIMP](https://www.gimp.org/).
From color grading to turning day into night,
the LUT shader is a handy tool for tweaking the look of your game.

<p align="center">
<img src="https://i.imgur.com/NPdJNGj.png" alt="Neutral LUT" title="Neutral LUT">
</p>

Before you can get started,
you'll need to find a neutral LUT image.
Neutral meaning that it leaves the fragment colors unchanged.
The LUT needs to be 256 pixels wide by 16 pixels tall and contain 16 blocks
with each block being 16 by 16 pixels.

The LUT is mapped out into 16 blocks.
Each block has a different level of blue.
As you move across the blocks, from left to right, the amount of blue increases.
You can see the amount of blue in each block's upper-left corner.
Within each block,
the amount of red increases as you move from left to right and
the amount of green increases as you move from top to bottom.
The upper-left corner of the first block is black since every RGB channel is zero.
The lower-right corner of the last block is white since every RGB channel is one.

<p align="center">
<img src="https://i.imgur.com/KyxPm1r.png" alt="LUT And Screenshot" title="LUT And Screenshot">
</p>

With the neutral LUT in hand, take a screenshot of your game and open it in your image editor.
Add the neutral LUT as a new layer and merge it with the screenshot.
As you manipulate the colors of the screenshot, the LUT will be altered in the same way.
When you're done editing, select only the LUT and save it as a new image.
You now have your new lookup table and can begin writing your shader.

```c
  // ...

  vec2 texSize = textureSize(colorTexture, 0).xy;

  vec4 color = texture(colorTexture, gl_FragCoord.xy / texSize);

  // ...
```

The LUT shader is a screen space technique.
Therefore, sample the scene's color at the current fragment or screen position.

```c
  // ...

  float u  =  floor(color.b * 15.0) / 15.0 * 240.0;
        u  = (floor(color.r * 15.0) / 15.0 *  15.0) + u;
        u /= 255.0;

  float v  = ceil(color.g * 15.0);
        v /= 15.0;
        v  = 1.0 - v;

  // ...
```

In order to transform the current fragment's color,
using the LUT,
you'll need to map the color to two UV coordinates on the lookup table texture.
The first mapping (shown up above) is to the nearest left or lower bound block location and
the second mapping (shown below) is to the nearest right or upper bound block mapping.
At the end, you'll combine these two mappings to create the final color transformation.

<p align="center">
<img src="https://i.imgur.com/j2JmyQ2.png" alt="RGB Channel Mapping" title="RGB Channel Mapping">
</p>

Each of the red, green, and blue channels maps to one of 16 possibilities in the LUT.
The blue channel maps to one of the 16 upper-left block corners.
After the blue channel maps to a block,
the red channel maps to one of the 16 horizontal pixel positions within the block and
the green channel maps to one of the 16 vertical pixel positions within the block.
These three mappings will determine the UV coordinate you'll need to sample a color from the LUT.

```c
  // ...

        u /= 255.0;

        v /= 15.0;
        v  = 1.0 - v;

  // ...
```

To calculate the final U coordinate, divide it by 255 since the LUT is 256 pixels wide and U ranges from zero to one.
To calculate the final V coordinate, divide it by 15 since the LUT is 16 pixels tall and V ranges from zero to one.
You'll also need to subtract the normalized V coordinate from one since V ranges from zero at the bottom to one at the top while
the green channel ranges from zero at the top to 15 at the bottom.

```c
  // ...

  vec3 left = texture(lookupTableTexture, vec2(u, v)).rgb;

  // ...
```

Using the UV coordinates, sample a color from the lookup table.
This is the nearest left block color.

```c
  // ...

  u  =  ceil(color.b * 15.0) / 15.0 * 240.0;
  u  = (ceil(color.r * 15.0) / 15.0 *  15.0) + u;
  u /= 255.0;

  v  = 1.0 - (ceil(color.g * 15.0) / 15.0);

  vec3 right = texture(lookupTableTexture, vec2(u, v)).rgb;

  // ...
```

Now you'll need to calculate the UV coordinates for the nearest right block color.
Notice how `ceil` or ceiling is being used now instead of `floor`.

<p align="center">
<img src="https://i.imgur.com/uciq7Um.png" alt="Mixing" title="Mixing">
</p>

```c
  // ...

  color.r = mix(left.r, right.r, fract(color.r * 15.0));
  color.g = mix(left.g, right.g, fract(color.g * 15.0));
  color.b = mix(left.b, right.b, fract(color.b * 15.0));

  // ...
```

Not every channel will map perfectly to one of its 16 possibilities.
For example, `0.5` doesn't map perfectly.
At the lower bound (`floor`),
it maps to `0.4666666666666667` and at the upper bound (`ceil`),
it maps to `0.5333333333333333`.
Compare that with `0.4` which maps to `0.4` at the lower bound and `0.4` at the upper bound.
For those channels which do not map perfectly,
you'll need to mix the left and right sides based on where the channel falls between its lower and upper bound.
For `0.5`, it falls directly between them making the final color a mixture of half left and half right.
However,
for `0.132` the mixture will be 98% right and 2% left since the fractional part of `0.123` times `15.0` is `0.98`.

```c
  // ...

  fragColor = color;

  // ...
```

Set the fragment color to the final mix and you're done.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [lookup-table.frag](../demonstration/shaders/fragment/lookup-table.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](film-grain.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](gamma-correction.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/motion-blur.md`

[:arrow_backward:](ssao.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](chromatic-aberration.md)

# 3D Game Shaders For Beginners

## Motion Blur

<p align="center">
<img src="https://i.imgur.com/eTnhpLr.gif" alt="Motion Blur" title="Motion Blur">
</p>

To really sell the illusion of speed, you can do no better than motion blur.
From high speed car chases to moving at warp speed,
motion blur greatly improves the look and feel of fast moving objects.

There are a few ways to implement motion blur as a screen space technique.
The less involved implementation will only blur the scene in relation to the camera's movements
while the more involved version will blur any moving objects even with the camera remaining still.
The less involved technique is described below but the principle is the same.

### Textures

```c
uniform sampler2D positionTexture;
uniform sampler2D colorTexture;

// ...
```

The input textures needed are the vertex positions in view space and the scene's colors.
Refer back to [SSAO](ssao.md#vertex-positions) for acquiring the vertex positions.

### Matrices

```c
// ...

uniform mat4 previousViewWorldMat;
uniform mat4 worldViewMat;
uniform mat4 lensProjection;

// ...
```

The motion blur technique determines the blur direction by comparing
the previous frame's vertex positions with the current frame's vertex positions.
To do this, you'll need the previous frame's view-to-world matrix,
the current frame's world-to-view matrix,
and the camera lens' projection matrix.

### Parameters

```c
// ...

uniform vec2 parameters;

// ...

void main() {
  int   size       = int(parameters.x);
  float separation =     parameters.y;

// ...
```

The adjustable parameters are `size` and `separation`.
`size` controls how many samples are taken along the blur direction.
Increasing `size` increases the amount of blur at the cost of performance.
`separation` controls how spread out the samples are along the blur direction.
Increasing `separation` increases the amount of blur at the cost of accuracy.

### Blur Direction

```c
  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 position1 = texture(positionTexture, texCoord);
  vec4 position0 = worldViewMat * previousViewWorldMat * position1;

  // ...
```

To determine which way to blur this fragment,
you'll need to know where things were last frame and where things are this frame.
To figure out where things are now,
sample the current vertex position.
To figure out where things were last frame,
transform the current position from view space to world space,
using the previous frame's view-to-world matrix,
and then transform it back to view space from world space using this frame's world-to-view matrix.
This transformed position is this fragment's previous interpolated vertex position.

<p align="center">
<img src="https://i.imgur.com/oQqdxM9.gif" alt="Position Projection" title="Position Projection">
</p>

```c
  // ...

  position0      = lensProjection * position0;
  position0.xyz /= position0.w;
  position0.xy   = position0.xy * 0.5 + 0.5;

  position1      = lensProjection * position1;
  position1.xyz /= position1.w;
  position1.xy   = position1.xy * 0.5 + 0.5;

  // ...
```

Now that you have the current and previous positions,
transform them to screen space.
With the positions in screen space,
you can trace out the 2D direction you'll need to blur the onscreen image.

```c
  // ...

  //   position1.xy = position0.xy + direction;
  vec2 direction    = position1.xy - position0.xy;

  if (length(direction) <= 0.0) { return; }

  // ...
```

The blur direction goes from the previous position to the current position.

### Blurring

```c
  // ...

  fragColor = texture(colorTexture, texCoord);

  // ...
```

Sample the current fragment's color.
This will be the first of the colors blurred together.

```c
  // ...

  direction.xy *= separation;

  // ...
```

Multiply the direction vector by the separation.

```c
  // ...

  vec2  forward  = texCoord;
  vec2  backward = texCoord;

  // ...
```

For a more seamless blur,
sample in the direction of the blur and in the opposite direction of the blur.
For now, set the two vectors to the fragment's UV coordinate.

```c
  // ...

  float count = 1.0;

  // ...
```

`count` is used to average all of the samples taken.
It starts at one since you've already sampled the current fragment's color.

```c
  // ...

  for (int i = 0; i < size; ++i) {
    forward  += direction;
    backward -= direction;

    fragColor +=
      texture
        ( colorTexture
        , forward
        );
    fragColor +=
      texture
        ( colorTexture
        , backward
        );

    count += 2.0;
  }

  // ...
```

Sample the screen's colors both in the forward and backward direction of the blur.
Be sure to add these samples together as you travel along.

```c
  // ...

  fragColor /= count;
}
```

The final fragment color is the average color of the samples taken.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [motion-blur.frag](../demonstration/shaders/fragment/motion-blur.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](ssao.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](chromatic-aberration.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/normal-mapping.md`

[:arrow_backward:](cel-shading.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](deferred-rendering.md)

# 3D Game Shaders For Beginners

## Normal Mapping

<p align="center">
<img src="https://i.imgur.com/M4eHo9I.gif" alt="Normal Mapping" title="Normal Mapping">
</p>

Normal mapping allows you to add surface details without adding any geometry.
Typically, in a modeling program like Blender, you create a high poly and a low poly version of your mesh.
You take the vertex normals from the high poly mesh and bake them into a texture.
This texture is the normal map.
Then inside the fragment shader, you replace the low poly mesh's vertex normals with the
high poly mesh's normals you baked into the normal map.
Now when you light your mesh, it will appear to have more polygons than it really has.
This will keep your FPS high while at the same time retain most of the details from the high poly version.

<p align="center">
<img src="https://i.imgur.com/nSY9AW4.gif" alt="From high to low poly with normal mapping." title="From high to low poly with normal mapping.">
</p>

Here you see the progression from the high poly model to the low poly model to the low poly model with the normal map applied.

<p align="center">
<img src="https://i.imgur.com/jvkRPE7.gif" alt="Normal Map Illusion" title="Normal Map Illusion">
</p>

Keep in mind though, normal mapping is only an illusion.
After a certain angle, the surface will look flat again.

### Vertex

```c
// ...

uniform mat3 p3d_NormalMatrix;

// ...

in vec3 p3d_Normal;

// ...

in vec3 p3d_Binormal;
in vec3 p3d_Tangent;

  // ...

  vertexNormal = normalize(p3d_NormalMatrix * p3d_Normal);
  binormal     = normalize(p3d_NormalMatrix * p3d_Binormal);
  tangent      = normalize(p3d_NormalMatrix * p3d_Tangent);

  // ...
```

Starting in the vertex shader,
you'll need to output to the fragment shader the normal vector, binormal vector, and the tangent vector.
These vectors are used, in the fragment shader, to transform the normal map normal from tangent space to view space.

`p3d_NormalMatrix` transforms the vertex normal, binormal, and tangent vectors to view space.
Remember that in view space, all of the coordinates are relative to the camera's position.

<blockquote>
[p3d_NormalMatrix] is the upper 3x3 of the inverse transpose of the ModelViewMatrix.
It is used to transform the normal vector into view-space coordinates.
<br>
<br>
<footer>
<a href="http://www.panda3d.org/manual/?title=List_of_GLSL_Shader_Inputs">Source</a>
</footer>
</blockquote>

```c
// ...

in vec2 p3d_MultiTexCoord0;

// ...

out vec2 normalCoord;

  // ...

  normalCoord   = p3d_MultiTexCoord0;

  // ...
```

<p align="center">
<img src="https://i.imgur.com/tLIA6Hu.gif" alt="Normal Maps" title="Normal Maps">
</p>

You'll also need to output, to the fragment shader, the UV coordinates for the normal map.

### Fragment

Recall that the vertex normal was used to calculate the lighting.
However, the normal map provides us with different normals to use when calculating the lighting.
In the fragment shader, you need to swap out the vertex normals for the normals found in the normal map.

```c
// ...

uniform sampler2D p3d_Texture1;

// ...

in vec2 normalCoord;

  // ...

  /* Find */
  vec4 normalTex   = texture(p3d_Texture1, normalCoord);

  // ...
```

Using the normal map coordinates the vertex shader sent, pull out the normal from the normal map.

```c
  // ...

  vec3 normal;

    // ...

    /* Unpack */
    normal =
      normalize
        ( normalTex.rgb
        * 2.0
        - 1.0
        );

    // ...
```

Earlier I showed how the normals are mapped to colors to create the normal map.
Now this process needs to be reversed so you can get back the original normals that were baked into the map.

```c
(r, g, b) =
  ( r * 2 - 1
  , g * 2 - 1
  , b * 2 - 1
  ) =
    (x, y, z)
```

Here's the process for unpacking the normals from the normal map.

```c
    // ...

    /* Transform */
    normal =
      normalize
        ( mat3
            ( tangent
            , binormal
            , vertexNormal
            )
        * normal
        );

    // ...
```

The normals you get back from the normal map are typically in tangent space.
They could be in another space, however.
For example, Blender allows you to bake the normals in tangent, object, world, or camera space.

<p align="center">
<img src="https://i.imgur.com/EzHJPd4.gif" alt="Replacing the vertex normals with the normal map normals." title="Replacing the vertex normals with the normal map normals.">
</p>

To take the normal map normal from tangent space to view pace,
construct a three by three matrix using the tangent, binormal, and vertex normal vectors.
Multiply the normal by this matrix and be sure to normalize it.

At this point, you're done.
The rest of the lighting calculations are the same.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](cel-shading.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](deferred-rendering.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/outlining.md`

[:arrow_backward:](flow-mapping.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](depth-of-field.md)

# 3D Game Shaders For Beginners

## Outlining

<p align="center">
<img src="https://i.imgur.com/EKaZRkR.gif" alt="Outlined Scene" title="Outlined Scene">
</p>

Outlining your scene's geometry can give your game a distinctive look,
reminiscent of comic books and cartoons.

### Discontinuities

The process of outlining is the process of finding and labeling discontinuities or differences.
Every time you find what you consider a significant difference,
you mark it with your line color.
As you go about labeling or coloring in the differences, outlines or edges will start to form.

Where you choose to search for the discontinuities is up to you.
It could be the diffuse colors in your scene,
the normals of your models,
the depth buffer,
or some other scene related data.

The demo uses the interpolated vertex positions to render the outlines.
However,
a less straightforward but more typical way is to use both the
scene's normals and depth buffer values to construct the outlines.

### Vertex Positions

```c
// ...

uniform sampler2D positionTexture;

// ...
```

Like SSAO, you'll need the vertex positions in view space.
Referrer back to [SSAO](ssao.md#vertex-positions) for details.

### Scene Colors

```c
// ...

uniform sampler2D colorTexture;

// ...
```

The demo darkens the colors of the scene where there's an outline.
This tends to look nicer than a constant color since it provides
some color variation to the edges.

### Parameters

```c
  // ...

  float minSeparation = 1.0;
  float maxSeparation = 3.0;
  float minDistance   = 0.5;
  float maxDistance   = 2.0;
  int   size          = 1;
  vec3 colorModifier  = vec3(0.324, 0.063, 0.099);

  // ...
```

The min and max separation parameters control the thickness of the outline
depending on the fragment's distance from the camera or depth.
The min and max distance control the significance of any changes found.
The `size` parameter controls the constant thickness of the line no matter the fragment's position.
The outline color is based on `colorModifier` and the current fragment's color.

### Fragment Position

```c
  // ...

  vec2 texSize   = textureSize(colorTexture, 0).xy;
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 texCoord  = fragCoord / texSize;

  vec4 position = texture(positionTexture, texCoord);

  // ...
```

Sample the position texture for the current fragment's position in the scene.
Recall that the position texture is just a screen shaped quad making the UV coordinate
the current fragment's screen coordinate divided by the dimensions of the screen.

### Fragment Depth

```c
  // ...

  float depth =
    clamp
      (   1.0
        - ( (far - position.y)
          / (far - near)
        )
      , 0.0
      , 1.0
      );

  float separation = mix(maxSeparation, minSeparation, depth);

  // ...
```

The fragment's depth ranges from zero to one.
When the fragment's view-space y coordinate matches the far clipping plane,
the depth is one.
When the fragment's view-space y coordinate matches the near clipping plane,
the depth is zero.
In other words,
the depth ranges from zero at the near clipping plane all the way up to one at the far clipping plane.

```c
  // ...

  float separation = mix(maxSeparation, minSeparation, depth);

  // ...
```

Converting the position to a depth value isn't necessary
but it allows you to vary the thickness of the outline based on how far
away the fragment is from the camera.
Far away fragments get a thinner line while nearer fragments get a thicker outline.
This tends to look nicer than a constant thickness since it gives depth to the outline.

### Finding The Discontinuities

<p align="center">
<img src="https://i.imgur.com/xAMRGhn.gif" alt="Edge Finding" title="Edge Finding">
</p>


```c
  // ...

  float mx = 0.0;

  for (int i = -size; i <= size; ++i) {
    for (int j = -size; j <= size; ++j) {
      // ...
    }
  }

  // ...
```

Now that you have the current fragment's position,
loop through an i by j grid or window surrounding the current fragment.


```c
      // ...

      texCoord =
          ( fragCoord
          + (vec2(i, j) * separation)
          )
        / texSize;

      vec4 positionTemp =
        texture
          ( positionTexture
          , texCoord
          );

      mx = max(mx, abs(position.y - positionTemp.y));

      // ...
```

With each iteration,
find the biggest distance between this fragment's
and the surrounding fragments' positions.

<p align="center">
<img src="https://i.imgur.com/idDZr62.png" alt="smoothstep" title="smoothstep">
</p>

```c
  // ...

  float diff = smoothstep(minDistance, maxDistance, mx);

  // ...
```

Calculate the significance of any difference discovered using the `minDistance`, `maxDistance`, and `smoothstep`.
`smoothstep` returns values from zero to one.
The `minDistance` is the left-most edge.
Any difference less than the minimum distance will be zero.
The `maxDistance` is the right-most edge.
Any difference greater than the maximum distance will be one.
For distances between the edges,
the difference will be between zero and one.
These values are interpolated along a s-shaped curve.

### Line Color

```c
  // ...

  vec3 lineColor = texture(colorTexture, texCoord).rgb * colorModifier;

  // ...
```

The line color is the current fragment color either darkened or lightened.

### Fragment Color

<p align="center">
<img src="https://i.imgur.com/yWNdPZe.gif" alt="Outlines" title="Outlines">
</p>

```c
  // ...

  fragColor.rgb = vec4(lineColor, diff);

  // ...
```

The fragment's RGB color is the `lineColor` and its alpha channel is `diff`.

### Sketchy

<p align="center">
<img src="https://i.imgur.com/FRBkSm1.gif" alt="Sketchy Outline" title="Sketchy Outline">
</p>

For a sketchy outline, you can distort the UV coordinates used to sample the position vectors.

<p align="center">
<img src="https://i.imgur.com/qgZNtnN.png" alt="Outline Noise" title="Outline Noise">
</p>

```c
// ...

uniform sampler2D noiseTexture;

// ...
```

Start by creating a RGB noise texture.
A good size is either 128 by 128 or 512 by 512.
Be sure to blur it and make it tileable.
This will produce a nice wavy, inky outline.

```c
  // ...

  float noiseScale = 10.0;

  // ...
```

The `noiseScale` parameter controls how distorted the outline is.
The bigger the `noiseScale`, the sketchier the line.

```c
  // ...

  vec2 fragCoord = gl_FragCoord.xy;

  vec2 noise  = texture(noiseTexture, fragCoord / textureSize(noiseTexture, 0).xy).rb;
       noise  = noise * 2.0 - 1.0;
       noise *= noiseScale;

  // ...
```

Sample the noise texture using the current screen/fragment position and the size of the noise texture.
Since you're distorting the UV coordinates used to sample the position vectors,
you'll only need two of the three color channels.
Map the two color channels from `[0, 1]` to `[-1, 1]`.
Finally, scale the noise by the scale chosen earlier.

```c
  // ...

  vec2 texSize  = textureSize(colorTexture, 0).xy;
  vec2 texCoord = (fragCoord - noise) / texSize;

  vec4 position = texture(positionTexture, texCoord);

  // ...
```

When sampling the current position,
subtract the noise vector from the current fragment's coordinates.

<p align="center">
<img src="https://i.imgur.com/wk43ybP.png" alt="Squiggly Outline" title="Squiggly Outline">
</p>

You could instead add it to the current fragment's coordinates
which will create more of a squiggly line that loosely follows the geometry.

```c
  // ...

      texCoord =
          (vec2(i, j) * separation + fragCoord + noise)
        / texSize;

      // ...

      vec4 positionTemp =
        texture
          ( positionTexture
          , texCoord
          );

      // ...
```

When sampling the surrounding positions inside the loop,
add the noise vector to the current fragment's coordinates.
The rest of the calculations are the same.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [outline.frag](../demonstration/shaders/fragment/outline.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](flow-mapping.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](depth-of-field.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/pixelization.md`

[:arrow_backward:](posterization.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](sharpen.md)

# 3D Game Shaders For Beginners

## Pixelization

<p align="center">
<img src="https://i.imgur.com/IbnyYZN.gif" alt="Pixelization" title="Pixelization">
</p>

Pixelizing your 3D game can give it a interesting look and
possibly save you time by not having to create all of the pixel art by hand.
Combine it with the posterization for a true retro look.

```c
  // ...

  int pixelSize = 5;

  // ...
```

Feel free to adjust the pixel size.
The bigger the pixel size, the blockier the image will be.

<p align="center">
<img src="https://i.imgur.com/WF5MmM0.gif" alt="Pixelization Process" title="Pixelization Process">
</p>

```c
  // ...

  float x = int(gl_FragCoord.x) % pixelSize;
  float y = int(gl_FragCoord.y) % pixelSize;

  x = floor(pixelSize / 2.0) - x;
  y = floor(pixelSize / 2.0) - y;

  x = gl_FragCoord.x + x;
  y = gl_FragCoord.y + y;

  // ...
```

The technique works by mapping each fragment to the center of its closest, non-overlapping
pixel-sized window.
These windows are laid out in a grid over the input texture.
The center-of-the-window fragments determine the color for the other fragments in their window.

```c
    // ...

    fragColor = texture(colorTexture, vec2(x, y) / texSize);

    // ...
```

Once you have determined the correct fragment coordinate to use,
pull its color from the input texture and assign that to the fragment color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [pixelize.frag](../demonstration/shaders/fragment/pixelize.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](posterization.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](sharpen.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/posterization.md`

[:arrow_backward:](depth-of-field.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](pixelization.md)

# 3D Game Shaders For Beginners

## Posterization

<p align="center">
<img src="https://i.imgur.com/hpP5G9z.gif" alt="Posterization" title="Posterization">
</p>

Posterization or color quantization is the process of reducing the number of unique colors in an image.
You can use this shader to give your game a comic book or retro look.
Combine it with [outlining](outlining.md) for a full-on cartoon art style.

There are various different ways to implement posterization.
This method works directly with the greyscale values and indirectly with the RGB values of the image.
For each fragment, it maps the RGB color to a greyscale value.
This greyscale value is then mapped to both its lower and upper level value.
The closest level to the original greyscale value is then mapped back to an RGB value
This new RGB value becomes the fragment color.
I find this method produces nicer results than the more typical methods you'll find.

```c
  // ...

  float levels = 10;

  // ...
```

The `levels` parameter controls how many discrete bands or steps there are.
This will break up the continuous values from zero to one into chunks.
With four levels, `0.0` to `1.0` becomes `0.0`, `0.25`, `0.5`, `0.75`, and `1.0`.


```c
  // ...

  fragColor = texture(posterizeTexture, texCoord);

  // ...
```

Sample the current fragment's color.

```c
  // ...

  float greyscale = max(fragColor.r, max(fragColor.g, fragColor.b));

  // ...
```

Map the RGB values to a greyscale value.
In this instance, the greyscale value is the maximum value of the R, G, and B values.

```c
  // ...

  float lower     = floor(greyscale * levels) / levels;
  float lowerDiff = abs(greyscale - lower);

  // ...
```

Map the greyscale value to its lower level and
then calculate the difference between its lower level and itself.
For example,
if the greyscale value is `0.87` and there are four levels, its lower level is `0.75` and the difference is `0.12`.


```c
  // ...

  float upper     = ceil(greyscale * levels) / levels;
  float upperDiff = abs(upper - greyscale);

  // ...
```

Now calculate the upper level and the difference.
Keeping with the example up above, the upper level is `1.0` and the difference is `0.13`.

```c
  // ...

  float level      = lowerDiff <= upperDiff ? lower : upper;
  float adjustment = level / greyscale;

  // ...
```

The closest level is used to calculate the adjustment.
The adjustment is the ratio between the quantized and unquantized greyscale value.
This adjustment is used to map the quantized greyscale value back to an RGB value.


```c
  // ...

  fragColor.rgb * adjustment;

  // ...
```

After multiplying `rgb` by the adjustment, `max(r, max(g, b))` will now equal the quantized greyscale value.
This maps the quantized greyscale value back to a red, green, and blue vector.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [posterize.frag](../demonstration/shaders/fragment/posterize.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](depth-of-field.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](pixelization.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/reference-frames.md`

[:arrow_backward:](running-the-demo.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](glsl.md)

# 3D Game Shaders For Beginners

## Reference Frames

Before you write any shaders, you should be familiar with the following frames of reference or coordinate systems.
All of them boil down to what origin `(0, 0, 0)` are these coordinates currently relative to?
Once you know that, you can then transform them, via some matrix, to some other vector space if need be.
Typically, when the output of some shader looks wrong, it's because of some coordinate system mix up.

### Model

<p align="center">
<img src="https://i.imgur.com/8xptajU.gif" alt="Model Space" title="Model Space">
</p>

The model or object coordinate system is relative to the origin of the model.
This is typically set to the center of the model's geometry in a modeling program like Blender.

### World

<p align="center">
<img src="https://i.imgur.com/fHl4ohX.gif" alt="World Space" title="World Space">
</p>

The world space is relative to the origin of the scene/level/universe that you've created.

### View

<p align="center">
<img src="https://i.imgur.com/3b4SGGH.gif" alt="View Space" title="View Space">
</p>

The view or eye coordinate space is relative to the position of the active camera.

### Clip

<p align="center">
<img src="https://i.imgur.com/iSEWS9Y.png" alt="Clip Space" title="Clip Space">
</p>

The clip space is relative to the center of the camera's film.
All coordinates are now homogeneous, ranging from negative one to one `(-1, 1)`.
X and y are parallel with the camera's film and the z coordinate is the depth.

<p align="center">
<img src="https://i.imgur.com/MhgmOLv.gif" alt="Frustum" title="Frustum">
</p>

Any vertex not within the bounds of the camera's frustum or view volume is clipped or discarded.
You can see this happening with the cube towards the back, clipped by the camera's far plane, and the cube off to the side.

### Screen

<p align="center">
<img src="https://i.imgur.com/bHHrjOl.png" alt="Screen Space" title="Screen Space">
</p>

The screen space is (typically) relative to the lower left corner of the screen.
X goes from zero to the screen width.
Y goes from zero to the screen height.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](running-the-demo.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](glsl.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/render-to-texture.md`

[:arrow_backward:](glsl.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](texturing.md)

# 3D Game Shaders For Beginners

## Render To Texture

Instead of rendering/drawing/painting directly to the screen, the example code uses a technique called "render to texture".
In order to render to a texture, you'll need to set up a framebuffer and bind a texture to it.
Multiple textures can be bound to a single framebuffer.

The textures bound to the framebuffer hold the vector(s) returned by the fragment shader.
Typically these vectors are color vectors `(r, g, b, a)` but they could also be position or normal vectors `(x, y, z, w)`.
For each bound texture, the fragment shader can output a different vector.
For example you could output a vertex's position and normal in a single pass.

Most of the example code dealing with Panda3D involves setting up
[framebuffer textures](https://www.panda3d.org/manual/?title=Render-to-Texture_and_Image_Postprocessing).
To keep things straightforward, nearly all of the fragment shaders in the example code have only one output.
However, you'll want to output as much as you can each render pass to keep your frames per second (FPS) high.

There are two framebuffer texture setups found in the example code.

<p align="center">
<img src="https://i.imgur.com/t3iLKhx.gif" alt="The first framebuffer texture setup." title="The first framebuffer texture setup.">
</p>

The first setup renders the mill scene into a framebuffer texture using a variety of vertex and fragment shaders.
This setup will go through each of the mill scene's vertexes and corresponding fragments.

In this setup, the example code performs the following.

- Stores geometry data (like vertex position or normal) for later use.
- Stores material data (like the diffuse color) for later use.
- UV maps the various textures (diffuse, normal, shadow, etc.).
- Calculates the ambient, diffuse, specular, and emission lighting.

<p align="center">
<img src="https://i.imgur.com/o8H6cTy.png" alt="The second framebuffer texture setup." title="The second framebuffer texture setup.">
</p>

The second setup is an orthographic camera pointed at a screen-shaped rectangle.
This setup will go through just the four vertexes and their corresponding fragments.

In this second setup, the example code performs the following.

- Manipulates the output of another framebuffer texture.
- Combines various framebuffer textures into one.

I like to think of this second setup as using layers in GIMP, Krita, or Inkscape.

<p align="center">
<img src="https://i.imgur.com/L6Hwuxa.gif" alt="Tabbing Through Framebuffer Textures" title="Tabbing Through Framebuffer Textures">
</p>

In the example code, you can see the output of a particular framebuffer texture
by using the <kbd>Tab</kbd> key or the <kbd>Shift</kbd>+<kbd>Tab</kbd> keys.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](glsl.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](texturing.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/rim-lighting.md`

[:arrow_backward:](fresnel-factor.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](cel-shading.md)

# 3D Game Shaders For Beginners

## Rim Lighting

<p align="center">
<img src="https://i.imgur.com/3erauzN.gif" alt="Rim Lighting" title="Rim Lighting">
</p>

Taking inspiration from the [fresnel factor](fresnel-factor.md),
rim lighting targets the rim or silhouette of an object.
When combined with [cel shading](cel-shading.md) and [outlining](outlining.md),
it can really complete that cartoon look.
You can also use it to highlight objects in the game,
making it easier for players to navigate and accomplish tasks.

```c
  // ...

  vec3 eye = normalize(-vertexPosition.xyz);

  // ...
```

As it was for the fresnel factor,
you'll need the eye vector.
If your vertex positions are in view space,
the eye vector is the negation of the vertex position.

<p align="center">
<img src="https://i.imgur.com/mMsQFbE.gif" alt="Rim Light" title="Rim Light">
</p>

```c
  // ...

  float rimLightIntensity = dot(eye, normal);
        rimLightIntensity = 1.0 - rimLightIntensity;
        rimLightIntensity = max(0.0, rimLightIntensity);

  // ...
```

The Intensity of the rim light ranges from zero to one.
When the eye and normal vector point in the same direction,
the rim light intensity is zero.
As the two vectors start to point in different directions,
the rim light intensity increases
until it eventually reaches one when the eye and normal become orthogonal or perpendicular to one another.

<p align="center">
<img src="https://i.imgur.com/AAFI8p1.gif" alt="Rim Light Power" title="Rim Light Power">
</p>

```c
  // ...

  rimLightIntensity = pow(rimLightIntensity, rimLightPower);

  // ...
```

You can control the falloff of the rim light using the power function.

```c
  // ...

  rimLightIntensity = smoothstep(0.3, 0.4, rimLightIntensity)

  // ...
```

`step` or `smoothstep` can also be used to control the falloff.
This tends to look better when using [cel shading](cel-shading.md).
You'll learn more about these functions in later sections.

```c
  // ...

  vec4 rimLight   = rimLightIntensity * diffuse;
       rimLight.a = diffuse.a;

  // ...
```

What color you use for the rim light is up to you.
The demo code multiplies the diffuse light by the `rimLightIntensity`.
This will highlight the silhouette without overexposing it
and without lighting any shadowed fragments.

```c
  // ...

  vec4 outputColor     = vec4(0.0);
       outputColor.a   = diffuseColor.a;
       outputColor.rgb =
           ambient.rgb
        +  diffuse.rgb
        + specular.rgb
        + rimLight.rgb
        + emission.rgb;

  // ...
```

After you've calculated the rim light,
add it to the ambient, diffuse, specular, and emission lights.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](fresnel-factor.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](cel-shading.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/running-the-demo.md`

[:arrow_backward:](building-the-demo.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](reference-frames.md)

# 3D Game Shaders For Beginners

## Running The Demo

<p align="center">
<img src="https://i.imgur.com/y5XcReP.gif" alt="Running The Demo" title="Running The Demo">
</p>

After you've built the example code, you can now run the executable or demo.

```bash
./3d-game-shaders-for-beginners
```

Here's how you run it on Linux or Mac.

```bash
3d-game-shaders-for-beginners.exe
```

Here's how you run it on Windows.

### Demo Controls

The demo comes with both keyboard and mouse controls to move the camera around,
toggle on and off the different effects,
adjust the fog,
and view the various different framebuffer textures.

#### Mouse

You can rotate the scene around by holding down the <kbd>Left Mouse</kbd> button and dragging.
Hold down the <kbd>Right Mouse</kbd> button and drag to move up, down, left, and/or right.
To zoom in, roll the <kbd>Mouse Wheel</kbd> forward.
To zoom out, roll the <kbd>Mouse Wheel</kbd> backward.

You can also change the focus point using the mouse.
To change the focus point,
click anywhere on the scene using the <kbd>Middle Mouse</kbd> button.

#### Keyboard

- <kbd>w</kbd> to rotate the scene down.
- <kbd>a</kbd> to rotate the scene clockwise.
- <kbd>s</kbd> to rotate the scene up.
- <kbd>d</kbd> to rotate the scene counterclockwise.
- <kbd>z</kbd> to zoom in to the scene.
- <kbd>x</kbd> to zoom out of the scene.
- <kbd>⬅</kbd> to move left.
- <kbd>➡</kbd> to move right.
- <kbd>⬆</kbd> to move up.
- <kbd>⬇</kbd> to move down.

<p></p>

- <kbd>1</kbd> to show midday.
- <kbd>2</kbd> to show midnight.

<p></p>

- <kbd>Delete</kbd> to toggle the sound.
- <kbd>3</kbd> to toggle fresnel.
- <kbd>4</kbd> to toggle rim lighting.
- <kbd>5</kbd> to toggle particles.
- <kbd>6</kbd> to toggle motion blur.
- <kbd>7</kbd> to toggle Kuwahara filtering.
- <kbd>8</kbd> to toggle cel shading.
- <kbd>9</kbd> to toggle lookup table processing.
- <kbd>0</kbd> to toggle between Phong and Blinn-Phong.
- <kbd>y</kbd> to toggle SSAO.
- <kbd>u</kbd> to toggle outlining.
- <kbd>i</kbd> to toggle bloom.
- <kbd>o</kbd> to toggle normal mapping.
- <kbd>p</kbd> to toggle fog.
- <kbd>h</kbd> to toggle depth of field.
- <kbd>j</kbd> to toggle posterization.
- <kbd>k</kbd> to toggle pixelization.
- <kbd>l</kbd> to toggle sharpen.
- <kbd>n</kbd> to toggle film grain.
- <kbd>m</kbd> to toggle screen space reflection.
- <kbd>,</kbd> to toggle screen space refraction.
- <kbd>.</kbd> to toggle flow mapping.
- <kbd>/</kbd> to toggle the sun animation.
- <kbd>\\</kbd> to toggle chromatic aberration.

<p></p>

- <kbd>r</kbd> to reset the scene.

<p></p>

- <kbd>\[</kbd> to decrease the fog near distance.
- <kbd>Shift</kbd>+<kbd>\[</kbd> to increase the fog near distance.
- <kbd>]</kbd> to increase the fog far distance.
- <kbd>Shift</kbd>+<kbd>]</kbd> to decrease the fog far distance.

<p></p>

- <kbd>Shift</kbd>+<kbd>-</kbd> to decrease the amount of foam.
- <kbd>-</kbd> to increase the amount of foam.

<p></p>

- <kbd>Shift</kbd>+<kbd>=</kbd> to decrease the relative index of refraction.
- <kbd>=</kbd> to increase the relative index of refraction.

<p></p>

- <kbd>Tab</kbd> to move forward through the framebuffer textures.
- <kbd>Shift</kbd>+<kbd>Tab</kbd> to move backward through the framebuffer textures.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](building-the-demo.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](reference-frames.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/screen-space-reflection.md`

[:arrow_backward:](chromatic-aberration.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](screen-space-refraction.md)

# 3D Game Shaders For Beginners

## Screen Space Reflection (SSR)

<p align="center">
<img src="https://i.imgur.com/AYG4tvg.gif" alt="Screen Space Reflections" title="Screen Space Reflections">
</p>

Adding reflections can really ground your scene.
Wet and shiny objects spring to life as nothing makes
something look wet or shiny quite like reflections.
With reflections, you can really sell the illusion of water and metallic objects.

In the [lighting](lighting.md) section, you simulated the reflected, mirror-like image of the light source.
This was the process of rendering the specular reflection.
Recall that the specular light was computed using the reflected light direction.
Similarly, using screen space reflection or SSR, you can simulate the reflection of
other objects in the scene instead of just the light source.
Instead of the light ray coming from the source and bouncing off into the camera,
the light ray comes from some object in the scene and bounces off into the camera.

SSR works by reflecting the screen image onto itself using only itself.
Compare this to cube mapping which uses six screens or textures.
In cube mapping, you reflect a ray from some point in your scene
to some point on the inside of a cube surrounding your scene.
In SSR, you reflect a ray from some point on your screen to some other point on your screen.
By reflecting your screen onto itself, you can create the illusion of reflection.
This illusion holds for the most part but SSR does fail in some cases as you'll see.

### Ray Marching

Screen space reflection uses a technique known as ray marching to determine the reflection for each fragment.
Ray marching is the process of iteratively extending or contracting the length or magnitude of some vector
in order to probe or sample some space for information.
The ray in screen space reflection is the position vector reflected about the normal.

Intuitively, a light ray hits some point in the scene,
bounces off,
travels in the opposite direction of the reflected position vector,
bounces off the current fragment,
travels in the opposite direction of the position vector,
and hits the camera lens allowing you to see the color of some point in the scene reflected in the current fragment.
SSR is the process of tracing the light ray's path in reverse.
It tries to find the reflected point the light ray bounced off of and hit the current fragment.
With each iteration,
the algorithm samples the scene's positions or depths,
along the reflection ray,
asking each time if the ray intersected with the scene's geometry.
If there is an intersection,
that position in the scene is a potential candidate for being reflected by the current fragment.

Ideally there would be some analytical method for determining the first intersection point exactly.
This first intersection point is the only valid point to reflect in the current fragment.
Instead, this method is more like a game of battleship.
You can't see the intersections (if there are any) so you start at the base of the reflection ray and call out coordinates
as you travel in the direction of the reflection.
With each call, you get back an answer of whether or not you hit something.
If you do hit something,
you try points around that area hoping to find the exact point of intersection.

<p align="center">
<img src="https://i.imgur.com/wnAC7NI.gif" alt="SSR Ray Marching" title="SSR Ray Marching">
</p>

Here you see ray marching being used to calculate each fragment's reflected point.
The vertex normal is the bright green arrow,
the position vector is the bright blue arrow,
and the bright red vector is the reflection ray marching through view space.

### Vertex Positions

Like SSAO, you'll need the vertex positions in view space.
Referrer back to [SSAO](ssao.md#vertex-positions) for details.

### Vertex Normals

To compute the reflections, you'll need the vertex normals in view space.
Referrer back to [SSAO](ssao.md#vertex-normals) for details.

<p align="center">
<img src="https://i.imgur.com/1cE2vBY.gif" alt="SSR using normal maps." title="SSR using normal maps.">
</p>

Here you see SSR using the normal mapped normals instead of the vertex normals.
Notice how the reflection follows the ripples in the water versus the more mirror
like reflection shown earlier.

To use the normal maps instead,
you'll need to transform the normal mapped normals from tangent space to view space
just like you did in the lighting calculations.
You can see this being done in [normal.frag](../demonstration/shaders/fragment/normal.frag).

### Position Transformations

<p align="center">
<img src="https://i.imgur.com/Qnsvkc0.gif" alt="Position Transformations" title="Position Transformations">
</p>

Just like
[SSAO](ssao.md),
SSR goes back and forth between the screen and view space.
You'll need the camera lens' projection matrix to transform points in view space to clip space.
From clip space, you'll have to transform the points again to UV space.
Once in UV space,
you can sample a vertex/fragment position from the scene
which will be the closest position in the scene to your sample.
This is the _screen space_ part in _screen space reflection_
since the "screen" is a texture UV mapped over a screen shaped rectangle.

### Reflected UV Coordinates

There are a few ways you can implement SSR.
The example code starts the reflection process by computing a reflected UV coordinate for each screen fragment.
You could skip this part and go straight to computing the reflected color instead, using the final rendering of the scene.

Recall that UV coordinates range from zero to one for both U and V.
The screen is just a 2D texture UV mapped over a screen-sized rectangle.
Knowing this, the example code doesn't actually need the final rendering of the scene
to compute the reflections.
It can instead calculate what UV coordinate each screen pixel will eventually use.
These calculated UV coordinates can be saved to a framebuffer texture
and used later when the scene has been rendered.

<p align="center">
<img src="https://i.imgur.com/pkQcGkD.gif" alt="Reflected UVs" title="Reflected UVs">
</p>

Here you see the reflected UV coordinates.
Without even rendering the scene yet,
you can get a good feel for what the reflections will look like.

```c
//...

uniform mat4 lensProjection;

uniform sampler2D positionTexture;
uniform sampler2D normalTexture;

//...
```

You'll need the camera lens' projection matrix as well as the interpolated vertex positions and normals in view space.

```c
  // ...

  float maxDistance = 15;
  float resolution  = 0.3;
  int   steps       = 10;
  float thickness   = 0.5;

  // ...
```

Like the other effects, SSR has a few parameters you can adjust.
Depending on the complexity of the scene, it may take you awhile to find the right settings.
Getting screen space reflections to look just right tends to be difficult when reflecting complex geometry.

The `maxDistance` parameter controls how far a fragment can reflect.
In other words, it controls the maximum length or magnitude of the reflection ray.

The `resolution` parameter controls how many fragments are skipped while traveling or marching the reflection ray during the first pass.
This first pass is to find a point along the ray's direction where the ray enters or goes behind some geometry in the scene.
Think of this first pass as the rough pass.
Note that the `resolution` ranges from zero to one.
Zero will result in no reflections while one will travel fragment-by-fragment along the ray's direction.
A `resolution` of one can slow down your FPS considerably especially with a large `maxDistance`.

The `steps` parameter controls how many iterations occur during the second pass.
This second pass is to find the exact point along the reflection ray's direction
where the ray immediately hits or intersects with some geometry in the scene.
Think of this second pass as the refinement pass.

The `thickness` controls the cutoff between what counts as a possible reflection hit and what does not.
Ideally, you'd like to have the ray immediately stop at some camera-captured position or depth in the scene.
This would be the exact point where the light ray bounced off, hit your current fragment, and then bounced off into the camera.
Unfortunately the calculations are not always that precise so `thickness` provides some wiggle room or tolerance.
You'll want the thickness to be as small as possible—just a short distance beyond a sampled position or depth.

<p align="center">
<img src="https://i.imgur.com/W163Mfw.png" alt="Larger Thickness" title="Larger Thickness">
</p>

You'll find that as the thickness gets larger, the reflections tend to smear in places.

<p align="center">
<img src="https://i.imgur.com/T6uH4Yu.png" alt="Smaller Thickness" title="Smaller Thickness">
</p>

Going in the other direction, as the thickness gets smaller,
the reflections become noisy with tiny little holes and narrow gaps.

```c
  // ...

  vec2 texSize  = textureSize(positionTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 positionFrom     = texture(positionTexture, texCoord);
  vec3 unitPositionFrom = normalize(positionFrom.xyz);
  vec3 normal           = normalize(texture(normalTexture, texCoord).xyz);
  vec3 pivot            = normalize(reflect(unitPositionFrom, normal));

  // ...
```

Gather the current fragment's position, normal, and reflection about the normal.
`positionFrom` is a vector from the camera position to the current fragment position.
`normal` is a vector pointing in the direction of the interpolated vertex normal for the current fragment.
`pivot` is the reflection ray or vector pointing in the reflected direction of the `positionFrom` vector.
It currently has a length or magnitude of one.


```c
  // ...

  vec4 startView = vec4(positionFrom.xyz + (pivot *           0), 1);
  vec4 endView   = vec4(positionFrom.xyz + (pivot * maxDistance), 1);

  // ...
```

Calculate the start and end point of the reflection ray in view space.

```c
  // ...

  vec4 startFrag      = startView;
       // Project to screen space.
       startFrag      = lensProjection * startFrag;
       // Perform the perspective divide.
       startFrag.xyz /= startFrag.w;
       // Convert the screen-space XY coordinates to UV coordinates.
       startFrag.xy   = startFrag.xy * 0.5 + 0.5;
       // Convert the UV coordinates to fragment/pixel coordnates.
       startFrag.xy  *= texSize;

  vec4 endFrag      = endView;
       endFrag      = lensProjection * endFrag;
       endFrag.xyz /= endFrag.w;
       endFrag.xy   = endFrag.xy * 0.5 + 0.5;
       endFrag.xy  *= texSize;

  // ...
```

Project or transform these start and end points from view space to screen space.
These points are now fragment positions which correspond to pixel positions on the screen.
Now that you know where the ray starts and ends on the screen, you can travel or march along its direction in screen space.
Think of the ray as a line drawn on the screen.
You'll travel along this line using it to sample the fragment positions stored in the position framebuffer texture.

<p align="center">
<img src="https://i.imgur.com/MpBR225.png" alt="Screen space versus view space." title="Screen space versus view space.">
</p>

Note that you could march the ray through view space
but this may under or over sample scene positions found in the position framebuffer texture.
Recall that the position framebuffer texture is the size and shape of the screen.
Every screen fragment or pixel corresponds to some position captured by the camera.
A reflection ray may travel a long distance in view space, but in screen space, it may only travel through a few pixels.
You can only sample the screen's pixels for positions
so it is inefficient to potentially sample the same pixels over and over again while marching in view space.
By marching in screen space, you'll more efficiently sample the fragments or pixels the ray actually occupies or covers.

```c
  // ...

  vec2 frag  = startFrag.xy;
       uv.xy = frag / texSize;

  // ...
```

The first pass will begin at the starting fragment position of the reflection ray.
Convert the fragment position to a UV coordinate by dividing the fragment's coordinates by the position texture's dimensions.

```c
  // ...

  float deltaX    = endFrag.x - startFrag.x;
  float deltaY    = endFrag.y - startFrag.y;

  // ...
```

Calculate the delta or difference between the X and Y coordinates of the end and start fragments.
This will be how many pixels the ray line occupies in the X and Y dimension of the screen.

<p align="center">
<img src="https://i.imgur.com/Um4dzgL.png" alt="The reflection ray in screen space." title="The reflection ray in screen space.">
</p>

```c
  // ...

  float useX      = abs(deltaX) >= abs(deltaY) ? 1 : 0;
  float delta     = mix(abs(deltaY), abs(deltaX), useX) * clamp(resolution, 0, 1);

  // ...
```

To handle all of the various different ways (vertical, horizontal, diagonal, etc.) the line can be oriented,
you'll need to keep track of and use the larger difference.
The larger difference will help you determine
how much to travel in the X and Y direction each iteration,
how many iterations are needed to travel the entire line,
and what percentage of the line does the current position represent.

`useX` is either one or zero.
It is used to pick the X or Y dimension depending on which delta is bigger.
`delta` is the larger delta of the two X and Y deltas.
It is used to determine how much to march in either dimension each iteration and how many iterations to take during the first pass.

```c
  // ...

  vec2  increment = vec2(deltaX, deltaY) / max(delta, 0.001);

  // ...
```

Calculate how much to increment the X and Y position by using the larger of the two deltas.
If the two deltas are the same, each will increment by one each iteration.
If one delta is larger than the other, the larger delta will increment by one while the smaller one will increment by less than one.
This assumes the `resolution` is one.
If the resolution is less than one, the algorithm will skip over fragments.

```c
startFrag  = ( 1,  4)
endFrag    = (10, 14)

deltaX     = (10 - 1) = 9
deltaY     = (14 - 4) = 10

resolution = 0.5

delta      = 10 * 0.5 = 5

increment  = (deltaX, deltaY) / delta
           = (     9,     10) / 5
           = ( 9 / 5,      2)
```

For example, say the `resolution` is 0.5.
The larger dimension will increment by two fragments instead of one.


```c
  // ...

  float search0 = 0;
  float search1 = 0;

  // ...
```

To move from the start fragment to the end fragment, the algorithm uses linear interpolation.

```c
current position x = (start x) * (1 - search1) + (end x) * search1;
current position y = (start y) * (1 - search1) + (end y) * search1;
```

`search1` ranges from zero to one.
When `search1` is zero, the current position is the start fragment.
When `search1` is one, the current position is the end fragment.
For any other value, the current position is somewhere between the start and end fragment.

`search0` is used to remember the last position on the line where the ray missed or didn't intersect with any geometry.
The algorithm will later use `search0` in the second pass to help refine the point at which the ray touches the scene's geometry.

```c
  // ...

  int hit0 = 0;
  int hit1 = 0;

  // ...
```

`hit0` indicates there was an intersection during the first pass.
`hit1` indicates there was an intersection during the second pass.

```c
  // ...

  float viewDistance = startView.y;
  float depth        = thickness;

  // ...
```

The `viewDistance` value is how far away from the camera the current point on the ray is.
Recall that for Panda3D, the Y dimension goes in and out of the screen in view space.
For other systems, the Z dimension goes in and out of the screen in view space.
In any case, `viewDistance` is how far away from the camera the ray currently is.
Note that if you use the depth buffer, instead of the vertex positions in view space, the `viewDistance` would be the Z depth.

Make sure not to confuse the `viewDistance` value with the Y dimension of the line being traveled across the screen.
The `viewDistance` goes from the camera into scene while the Y dimension of the line travels up or down the screen.

The `depth` is the view distance difference between the current ray point and scene position.
It tells you how far behind or in front of the scene the ray currently is.
Remember that the scene positions are the interpolated vertex positions stored in the position framebuffer texture.

```c
  // ...

  for (i = 0; i < int(delta); ++i) {

  // ...
```

You can now begin the first pass.
The first pass runs while `i` is less than the `delta` value.
When `i` reaches `delta`, the algorithm has traveled the entire length of the line.
Remember that `delta` is the larger of the two X and Y deltas.

<p align="center">
<img src="https://i.imgur.com/Qnsvkc0.gif" alt="Screen Space Transformations" title="Screen Space Transformations">
</p>

```c
    // ...

    frag      += increment;
    uv.xy      = frag / texSize;
    positionTo = texture(positionTexture, uv.xy);

    // ...
```

Advance the current fragment position closer to the end fragment.
Use this new fragment position to look up a scene position stored in the position framebuffer texture.

```c
    // ...

    search1 =
      mix
        ( (frag.y - startFrag.y) / deltaY
        , (frag.x - startFrag.x) / deltaX
        , useX
        );

    // ...
```

Calculate the percentage or portion of the line the current fragment represents.
If `useX` is zero, use the Y dimension of the line.
If `useX` is one, use the X dimension of the line.

When `frag` equals `startFrag`,
`search1` equals zero since `frag - startFrag` is zero.
When `frag` equals `endFrag`,
`search1` is one since `frag - startFrag` equals `delta`.

`search1` is the percentage or portion of the line the current position represents.
You'll need this to interpolate between the ray's view-space start and end distances from the camera.

```c
    // ...

    viewDistance = (startView.y * endView.y) / mix(endView.y, startView.y, search1);

    // ...
```

Using `search1`,
interpolate the view distance (distance from the camera in view space) for the current position you're at on the reflection ray.

```c
// Incorrect.
viewDistance = mix(startView.y, endView.y, search1);

// Correct.
viewDistance = (startView.y * endView.y) / mix(endView.y, startView.y, search1);
```

You may be tempted to just interpolate between the view distances of the start and end view-space positions
but this will give you the wrong view distance for the current position on the reflection ray.
Instead, you'll need to perform
[perspective-correct interpolation](https://www.comp.nus.edu.sg/~lowkl/publications/lowk_persp_interp_techrep.pdf)
which you see here.

```c
    // ...

    depth        = viewDistance - positionTo.y;

    // ...
```

Calculate the difference between the ray's view distance at this point and the sampled view distance of the scene at this point.

```c
    // ...

    if (depth > 0 && depth < thickness) {
      hit0 = 1;
      break;
    } else {
      search0 = search1;
    }

    // ...
```

If the difference is between zero and the thickness,
this is a hit.
Set `hit0` to one and exit the first pass.
If the difference is not between zero and the thickness,
this is a miss.
Set `search0` to equal `search1` to remember this position as the last known miss.
Continue marching the ray towards the end fragment.

```c
  // ...

  search1 = search0 + ((search1 - search0) / 2);

  // ...
```

At this point you have finished the first pass.
Set the `search1` position to be halfway between the position of the last miss and the position of the last hit.

```c
  // ...

  steps *= hit0;

  for (i = 0; i < steps; ++i) {

  // ...
```

You can now begin the second pass.
If the reflection ray didn't hit anything in the first pass, skip the second pass.

```c
    // ...

    frag       = mix(startFrag.xy, endFrag.xy, search1);
    uv.xy      = frag / texSize;
    positionTo = texture(positionTexture, uv.xy);

    // ...
```

As you did in the first pass,
use the current position on the ray line to sample a position from the scene.

```c
    // ...

    viewDistance = (startView.y * endView.y) / mix(endView.y, startView.y, search1);
    depth        = viewDistance - positionTo.y;

    // ...
```

Interpolate the view distance for the current ray line position
and calculate the camera distance difference between the ray at this point and the scene.

```c
    // ...

    if (depth > 0 && depth < thickness) {
      hit1 = 1;
      search1 = search0 + ((search1 - search0) / 2);
    } else {
      float temp = search1;
      search1 = search1 + ((search1 - search0) / 2);
      search0 = temp;
    }

    // ...
```

If the depth is within bounds, this is a hit.
Set `hit1` to one and set `search1` to be halfway between the last known miss position and this current hit position.
If the depth is not within bounds, this is a miss.
Set `search1` to be halfway between this current miss position and the last known hit position.
Move `search0` to this current miss position.
Continue this back and forth search while `i` is less than `steps`.

```c
  // ...

  float visibility =
      hit1

  // ...
```

You're now done with the second and final pass but before you can output the reflected UV coordinates,
you'll need to calculate the `visibility` of the reflection.
The `visibility` ranges from zero to one.
If there wasn't a hit in the second pass, the `visibility` is zero.

```c
  // ...

    * positionTo.w

  // ...
```

If the reflected scene position's alpha or `w` component is zero,
the `visibility` is zero.
Note that if `w` is zero, there was no scene position at that point.

<p align="center">
<img src="https://i.imgur.com/7e2cOdZ.gif" alt="Reflection ray pointing towards the camera position." title="Reflection ray pointing towards the camera position.">
</p>

```c
  // ...

    * ( 1
      - max
         ( dot(-unitPositionFrom, pivot)
         , 0
         )
      )

  // ...
```

One of the ways in which screen space reflection can fail is when the reflection ray points in the general direction of the camera.
If the reflection ray points towards the camera and hits something, it's most likely hitting the back side of something facing away
from the camera.

To handle this failure case, you'll need to gradually fade out the reflection based
on how much the reflection vector points to the camera's position.
If the reflection vector points directly in the opposite direction of the position vector,
the visibility is zero.
Any other direction results in the visibility being greater than zero.

Remember to normalize both vectors when taking the dot product.
`unitPositionFrom` is the normalized position vector.
It has a length or magnitude of one.

```c
  // ...

    * ( 1
      - clamp
          ( depth / thickness
          , 0
          , 1
          )
      )

  // ...
```

As you sample scene positions along the reflection ray,
you're hoping to find the exact point where the reflection ray first intersects with the scene's geometry.
Unfortunately, you may not find this particular point.
Fade out the reflection the further it is from the intersection point you did find.

```c
  // ...

    * ( 1
      - clamp
          (   length(positionTo - positionFrom)
            / maxDistance
          , 0
          , 1
          )
      )

  // ...
```

Fade out the reflection based on how far way the reflected point is from the initial starting point.
This will fade out the reflection instead of it ending abruptly as it reaches `maxDistance`.

<p align="center">
<img src="https://i.imgur.com/i0btBna.gif" alt="Reflection ray exiting the frustum." title="Reflection ray exiting the frustum.">
</p>


```c
  // ...

    * (uv.x < 0 || uv.x > 1 ? 0 : 1)
    * (uv.y < 0 || uv.y > 1 ? 0 : 1);

  // ...
```

If the reflected UV coordinates are out of bounds, set the `visibility` to zero.
This occurs when the reflection ray travels outside the camera's frustum.

```c
  visibility = clamp(visibility, 0, 1);

  uv.ba = vec2(visibility);
```

Set the blue and alpha component to the visibility as the UV coordinates only need the RG or XY components of the final vector.

```c
  // ...

  fragColor = uv;

  // ...
```

The final fragment color is the reflected UV coordinates and the visibility.

### Specular Map

<p align="center">
<img src="https://i.imgur.com/iuFYVWB.gif" alt="Specular Map" title="Specular Map">
</p>

In addition to the reflected UV coordinates, you'll also need a specular map.
The example code creates one using the fragment's material specular properties.

```c
// ...

#define MAX_SHININESS 127.75

uniform struct
  { vec3 specular
  ; float shininess
  ;
  } p3d_Material;

out vec4 fragColor;

void main() {
  fragColor =
    vec4
      ( p3d_Material.specular
      , clamp(p3d_Material.shininess / MAX_SHININESS, 0, 1)
      );
}
```

The specular fragment shader is quite simple.
Using the fragment's material,
the shader outputs the specular color and uses the alpha channel for the shininess.
The shininess is mapped to a range of zero to one.
In Blender, the maximum specular hardness or shininess is 511.
When exporting from Blender to Panda3D, 511 is exported as 127.75.
Feel free to adjust the shininess to range of zero to one however you see fit for your particular stack.

The example code generates a specular map from the material specular properties but you
could create one in GIMP, for example, and attach that as a texture to your 3D model.
For instance,
say your 3D treasure chest has shiny brackets on it but nothing else should reflect the environment.
You can paint the brackets some shade of gray and the rest of the treasure chest black.
This will mask off the brackets, allowing your shader to render the reflections on only the brackets
and nothing else.

### Scene Colors

<p align="center">
<img src="https://i.imgur.com/diBSxPI.png" alt="Scene Colors" title="Scene Colors">
</p>

You'll need to render the parts of the scene you wish to reflect and store this in a framebuffer texture.
This is typically just the scene without any reflections.

### Reflected Scene Colors

<p align="center">
<img src="https://i.imgur.com/UPvgfDU.gif" alt="Reflected Scene Colors" title="Reflected Scene Colors">
</p>

Here you see the reflected colors saved to a framebuffer texture.

```c
// ...

uniform sampler2D uvTexture;
uniform sampler2D colorTexture;

// ...
```

Once you have the reflected UV coordinates, looking up the reflected colors is fairly easy.
You'll need the reflected UV coordinates texture and the color texture containing the colors you wish to reflect.

```c
  // ...

  vec2 texSize  = textureSize(uvTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 uv    = texture(uvTexture,    texCoord);
  vec4 color = texture(colorTexture, uv.xy);

  // ...
```

Using the UV coordinates for the current fragment, look up the reflected color.

```c
  // ...

  float alpha = clamp(uv.b, 0, 1);

  // ...
```

Recall that the reflected UV texture stored the visibility in the B or blue component.
This is the alpha channel for the reflected colors framebuffer texture.

```c
  // ...

  fragColor = vec4(mix(vec3(0), color.rgb, alpha), alpha);

  // ...
```

The fragment color is a mix between no reflection and the reflected color based on the visibility.
The visibility was computed during the reflected UV coordinates step.

### Blurred Reflected Scene Colors

<p align="center">
<img src="https://i.imgur.com/gVvx1Ei.png" alt="Blurred Reflected Scene Colors" title="Blurred Reflected Scene Colors">
</p>

Now blur the reflected scene colors and store this in a framebuffer texture.
The blurring is done using a box blur.
Refer to the [SSAO blurring](ssao.md#blurring) step for details.

The blurred reflected colors are used for surfaces that have a less than mirror like finish.
These surfaces have tiny little hills and valleys that tend to diffuse or blur the reflection.
I'll cover this more during the roughness calculation.

### Reflections

```c
// ...

uniform sampler2D colorTexture;
uniform sampler2D colorBlurTexture;
uniform sampler2D specularTexture;

// ...
```

To generate the final reflections, you'll need the three framebuffer textures computed earlier.
You'll need the reflected colors, the blurred reflected colors, and the specular map.

```c
  // ...

  vec4 specular  = texture(specularTexture,  texCoord);
  vec4 color     = texture(colorTexture,     texCoord);
  vec4 colorBlur = texture(colorBlurTexture, texCoord);

  // ...
```

Look up the specular amount and shininess, the reflected scene color, and the blurred reflected scene color.

```c
  // ...

  float specularAmount = dot(specular.rgb, vec3(1)) / 3;

  if (specularAmount <= 0) { fragColor = vec4(0); return; }

  // ...
```

Map the specular color to a greyscale value.
If the specular amount is none, set the frag color to nothing and return.

Later on, you'll multiply the final reflection color by the specular amount.
Multiplying by the specular amount allows you to control how much a material reflects its environment
simply by brightening or darkening the greyscale value in the specular map.

```c
  dot(specular.rgb, vec3(1)) == (specular.r + specular.g + specular.b);
```

Using the dot product to produce the greyscale value is just a short way of summing the three color components.

```c
  // ...

  float roughness = 1 - min(specular.a, 1);

  // ...
```

Calculate the roughness based on the shininess value set during the specular map step.
Recall that the shininess value was saved in the alpha channel of the specular map.
The shininess determined how spread out or blurred the specular reflection was.
Similarly, the `roughness` determines how blurred the reflection is.
A roughness of one will produce the blurred reflection color.
A roughness of zero will produce the non-blurred reflection color.
Doing it this way allows you to control how blurred the reflection is just by changing
the material's shininess value.

The example code generates a roughness map from the material specular properties but you
could create one in GIMP, for example, and attach that as a texture to your 3D model.
For instance, say you have a tiled floor that has polished tiles and scratched up tiles.
The polished tiles could be painted a more translucent white while the scratched up tiles could be painted a more opaque white.
The more translucent/transparent the greyscale value, the more the shader will use the blurred reflected color.
The scratched tiles will have a blurry reflection while the polished tiles will have a mirror like reflection.

```c
  // ...

  fragColor = mix(color, colorBlur, roughness) * specularAmount;

  // ...
```

Mix the reflected color and blurred reflected color based on the roughness.
Multiply that vector by the specular amount and then set that value as the fragment color.

The reflection color is a mix between the reflected scene color and the blurred reflected scene color based on the roughness.
A high roughness will produce a blurry reflection meaning the surface is rough.
A low roughness will produce a clear reflection meaning the surface is smooth.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [normal.frag](../demonstration/shaders/fragment/normal.frag)
- [material-specular.frag](../demonstration/shaders/fragment/material-specular.frag)
- [screen-space-reflection.frag](../demonstration/shaders/fragment/screen-space-reflection.frag)
- [reflection-color.frag](../demonstration/shaders/fragment/reflection-color.frag)
- [reflection.frag](../demonstration/shaders/fragment/reflection.frag)
- [box-blur.frag](../demonstration/shaders/fragment/box-blur.frag)
- [base-combine.frag](../demonstration/shaders/fragment/base-combine.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](chromatic-aberration.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](screen-space-refraction.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/screen-space-refraction.md`

[:arrow_backward:](screen-space-reflection.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](foam.md)

# 3D Game Shaders For Beginners

## Screen Space Refraction (SSR)

<p align="center">
<img src="https://i.imgur.com/8Mdcn4y.gif" alt="Screen Space Refraction" title="Screen Space Refraction">
</p>

Screen space refraction,
much like
[screen space reflection](screen-space-reflection.md),
adds a touch of realism you can't find anywhere else.
Glass, plastic, water, and other transparent/translucent materials spring to life.

[Screen space reflection](screen-space-reflection.md)
and screen space refraction work almost identically expect for one major difference.
Instead of using the reflected vector, screen space refraction uses the
[refracted vector](http://asawicki.info/news_1301_reflect_and_refract_functions.html).
It's a slight change in code but a big difference visually.

### Vertex Positions

Like SSAO, you'll need the vertex positions in view space.
Referrer back to [SSAO](ssao.md#vertex-positions) for details.

However,
unlike SSAO,
you'll need the scene's vertex positions with and without the refractive objects.
Refractive surfaces are translucent, meaning you can see through them.
Since you can see through them, you'll need the vertex positions behind the refractive surface.
Having both the foreground and background vertex positions will allow you to calculate
UV coordinates and depth.

### Vertex Normals

To compute the refractions, you'll need the scene's foreground vertex normals in view space.
The background vertex normals aren't needed unless you need to incorporate the background surface detail
while calculating the refracted UV coordinates and distances.
Referrer back to [SSAO](ssao.md#vertex-normals) for details.

<p align="center">
<img src="https://i.imgur.com/MZ2R8I6.gif" alt="Normal maps versus no normal maps." title="Normal maps versus no normal maps.">
</p>

Here you see the water refracting the light with and without normal maps.
If available, be sure to use the normal mapped normals instead of the vertex normals.
The smoother and flatter the surface, the harder it is to tell the light is being refracted.
There will be some distortion but not enough to make it worthwhile.

To use the normal maps instead,
you'll need to transform the normal mapped normals from tangent space to view space
just like you did in the [lighting](normal-mapping.md#fragment) calculations.
You can see this being done in [normal.frag](../demonstration/shaders/fragment/normal.frag).

### Position Transformations

<p align="center">
<img src="https://i.imgur.com/bXtXDyu.gif" alt="Position Transformations" title="Position Transformations">
</p>

Just like
[SSAO](ssao.md) and [screen space reflection](screen-space-reflection.md),
screen space refraction goes back and forth between the screen and view space.
You'll need the camera lens' projection matrix to transform points in view space to clip space.
From clip space, you'll have to transform the points again to UV space.
Once in UV space,
you can sample a vertex/fragment position from the scene
which will be the closest position in the scene to your sample.
This is the _screen space_ part in _screen space refraction_
since the "screen" is a texture UV mapped over a screen shaped rectangle.

### Refracted UV Coordinates

Recall that UV coordinates range from zero to one for both U and V.
The screen is just a 2D texture UV mapped over a screen-sized rectangle.
Knowing this, the example code doesn't actually need the final rendering of the scene
to compute the refraction.
It can instead calculate what UV coordinate each screen pixel will eventually use.
These calculated UV coordinates can be saved to a framebuffer texture
and used later when the scene has been rendered.

The process of refracting the UV coordinates is very similar to the process of
[reflecting the UV coordinates](screen-space-reflection.md#reflected-uv-coordinates).
Below are the adjustments you'll need to turn reflection into refraction.

```c
// ...

uniform sampler2D positionFromTexture;
uniform sampler2D positionToTexture;
uniform sampler2D normalFromTexture;

// ...
```

Reflection only deals with what is in front of the reflective surface.
Refraction, however, deals with what is behind the refractive surface.
To accommodate this, you'll need both the vertex positions of the scene
with the refracting surfaces taken out and the vertex positions of the scene
with the refracting surfaces left in.

<p align="center">
<img src="https://i.imgur.com/FjQtjsm.gif" alt="Without and with refractive surfaces." title="Without and with refractive surfaces.">
</p>

`positionFromTexture` are the scene's vertex positions with the refracting surfaces left in.
`positionToTexture` are the scene's vertex positions with the refracting surfaces taken out.
`normalFromTexture` are the scene's vertex normals with the refraction surfaces left in.
There's no need for the vertex normals behind the refractive surfaces unless
you want to incorporate the surface detail for the background geometry.

```c
// ...

uniform vec2 rior;

// ...
```

Refraction has one more adjustable parameter than reflection.
`rior` is the relative index of refraction or relative refractive index.
It is the ratio of the refraction indexes of two mediums.
So for example, going from water to air is `1 / 1.33 ≈ 0.75`.
The numerator is the refractive index of the medium the light is leaving and
the denominator is the refractive index of the medium the light is entering.
An `rior` of one means the light passes right through without being refracted or bent.
As `rior` grows, the refraction will become a
[reflection](https://en.wikipedia.org/wiki/Total_internal_reflection).

There's no requirement that `rior` must adhere to the real world.
The demo uses `1.05`.
This is completely unrealistic (light does not travel faster through water than air)
but the realistic setting produced too many artifacts.
In the end, the distortion only has to be believable—not realistic.

<p align="center">
<img src="https://i.imgur.com/dDOnobK.gif" alt="Adjusting the relative index of refraction." title="Adjusting the relative index of refraction.">
</p>

`rior` values above one tend to elongate the refraction while
numbers below one tend to shrink the refraction.

As it was with screen space reflection,
the screen doesn't have the entire geometry of the scene.
A refracted ray may march through the screen space and never hit a captured surface.
Or it may hit a surface but it's the backside not captured by the camera.
When this happened during reflection, the fragment was left blank.
This indicated no reflection or not enough information to determine a reflection.
Leaving the fragment blank was fine for reflection since the reflective surface would fill in the gaps.

<p align="center">
<img src="https://i.imgur.com/vcQDAYU.gif" alt="Refraction Holes" title="Refraction Holes">
</p>

For refraction, however, we must set the fragment to some UV.
If the fragment is left blank,
the refractive surface will contain holes that let the detail behind it come through.
This would be okay for a completely transparent surface but usually
the refractive surface will have some tint to it, reflection, etc.

```c
  // ...

  vec2 texSize  = textureSize(positionFromTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 uv = vec4(texCoord.xy, 1, 1);

  // ...
```

The best choice is to select the UV as if the `rior` was one.
This will leave the UV coordinate unchanged,
allowing the background to show through instead
of there being a hole in the refractive surface.

<p align="center">
<img src="https://i.imgur.com/9fybLUO.png" alt="Refraction UV Map" title="Refraction UV Map">
</p>

Here you see the refracted UV texture for the mill scene.
The wheel and waterway disturb what is otherwise a smooth gradient.
The disruptions shift the UV coordinates from their screen position to their refracted screen position.

```c
  // ...

  vec3 unitPositionFrom = normalize(positionFrom.xyz);
  vec3 normalFrom       = normalize(texture(normalFromTexture, texCoord).xyz);
  vec3 pivot            = normalize(refract(unitPositionFrom, normalFrom, rior.x));

  // ...
```

The most important difference is the calculation of the refracted vector versus the reflected vector.
Both use the unit position and normal but `refract` takes an additional parameter specifying the relative refractive index.

```c
    // ...

    frag      += increment;
    uv.xy      = frag / texSize;
    positionTo = texture(positionToTexture, uv.xy);

    // ...
```

The `positionTo`, sampled by the `uv` coordinates, uses the `positionToTexture`.
For reflection,
you only need one framebuffer texture containing the scene's interpolated vertex positions in view space.
However,
for refraction,
`positionToTexture` contains the vertex positions of the scene minus the refractive surfaces since
the refraction ray typically goes behind the surface.
If `positionFromTexture` and `positionToTexture` were the same for refraction,
the refracted ray would hit the refractive surface instead of what is behind it.

### Refraction Mask

<p align="center">
<img src="https://i.imgur.com/iuFYVWB.gif" alt="Material Specular" title="Material Specular">
</p>

You'll need a mask to filter out the non-refractive parts of the scene.
This mask will determine which fragment does and does not receive a refracted color.
You could use this mask during the refracted UV calculation step or later when you
actually sample the colors at the refracted UV coordinates.

The mill scene uses the models' material specular as a mask.
For the demo's purposes,
the specular map is sufficient but you may want to use a more specialized map.
Refer back to [screen space reflection](screen-space-reflection.md#specular-map) for how to render the specular map.

## Background Colors

<p align="center">
<img src="https://i.imgur.com/AmT9RrU.gif" alt="Background Colors" title="Background Colors">
</p>

You'll need to render the parts of the scene behind the refractive objects.
This can be done by hiding the refractive objects and then rendering the scene to a framebuffer texture.

### Foreground Colors

<p align="center">
<img src="https://i.imgur.com/6RPHULr.gif" alt="Foreground Colors" title="Foreground Colors">
</p>

```c
// ...

uniform sampler2D uvTexture;
uniform sampler2D refractionMaskTexture;
uniform sampler2D positionFromTexture;
uniform sampler2D positionToTexture;
uniform sampler2D backgroundColorTexture;

// ...
```

To render the actual refractions or foreground colors,
you'll need the refracted UV coordinates,
refraction mask,
the foreground and background vertex positions,
and the background colors.

```c
  // ...

  vec3  tintColor = vec3(0.27, 0.58, 0.92, 0.3);
  float depthMax  = 2;

  // ...
```

`tintColor` and `depthMax` are adjustable parameters.
`tintColor` colorizes the background color.
`depthMax` ranges from zero to infinity.
When the distance between the foreground and background position reaches `depthMax`,
the foreground color will be the fully tinted background color.
At distance zero, the foreground will be the background color.

```c
  // ...

  vec2 texSize  = textureSize(backgroundColorTexture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  vec4 uv              = texture(uvTexture,              texCoord);
  vec4 mask            = texture(maskTexture,            texCoord);
  vec4 positionFrom    = texture(positionFromTexture,    texCoord);
  vec4 positionTo      = texture(positionToTexture,      uv.xy);
  vec4 backgroundColor = texture(backgroundColorTexture, uv.xy);

  if (refractionMask.r <= 0) { fragColor = vec4(0); return; }

  // ...
```

Pull out the uv coordinates,
mask,
background position,
foreground position,
and the background color.

If the refraction mask is turned off for this fragment, return nothing.

```c
  // ...

  float depth   = length(positionTo.xyz - positionFrom.xyz);
  float mixture = clamp(depth / depthMax, 0, 1);

  vec3 shallowColor    = backgroundColor.rgb;
  vec3 deepColor       = mix(shallowColor, tintColor.rgb, tintColor.a);
  vec3 foregroundColor = mix(shallowColor, deepColor,     mixture);

  // ...
```

<p align="center">
<img src="https://i.imgur.com/IEFKerB.gif" alt="Refraction Depth" title="Refraction Depth">
</p>

Calculate the depth or distance between the foreground position and the background position.
At zero depth, the foreground color will be the shallow color.
At `depthMax`, the foreground color will be the deep color.
The deep color is the background color tinted with `tintColor`.

```c
  // ...

  fragColor = mix(vec4(0), vec4(foregroundColor, 1), uv.b);

  // ...
```

Recall that the blue channel, in the refracted UV texture, is set to the visibility.
The visibility declines as the refracted ray points back at the camera.
While the visibility should always be one, it is put here for completeness.
As the visibility lessens, the fragment color will receive less and less of the foreground color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [normal.frag](../demonstration/shaders/fragment/normal.frag)
- [material-specular.frag](../demonstration/shaders/fragment/material-specular.frag)
- [screen-space-refraction.frag](../demonstration/shaders/fragment/screen-space-refraction.frag)
- [refraction.frag](../demonstration/shaders/fragment/refraction.frag)
- [base-combine.frag](../demonstration/shaders/fragment/base-combine.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](screen-space-reflection.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](foam.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/setup.md`

[:arrow_backward:](gamma-correction.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](building-the-demo.md)

# 3D Game Shaders For Beginners

## Setup

<p align="center">
<img src="https://i.imgur.com/fYpIWNk.gif" alt="Setup" title="Setup">
</p>

Below is the setup used to develop and test the example code.

### Environment

The example code was developed and tested using the following environment.

- Linux manjaro 5.10.42-1-MANJARO
- OpenGL renderer string: GeForce GTX 970/PCIe/SSE2
- OpenGL version string: 4.6.0 NVIDIA 465.31
- g++ (GCC) 11.1.0
- Panda3D 1.10.9

### Materials

Each [Blender](https://blender.org) material used to build `mill-scene.egg` has five textures
in the following order.

- Diffuse
- Normal
- Specular
- Reflection
- Refraction

By having the same maps in the same positions for all models,
the shaders can be generalized, reducing the need to duplicate code.

If an object uses its vertex normals, a "flat blue" normal map is used.

<p align="center">
<img src="https://i.imgur.com/tFmKgoH.png" alt="A flat normal map." title="A flat normal map.">
</p>

Here is an example of a flat normal map.
The only color it contains is flat blue `(red = 128, green = 128, blue = 255)`.
This color represents a unit (length one) normal pointing in the positive z-axis `(0, 0, 1)`.

```c
(0, 0, 1) =
  ( round((0 * 0.5 + 0.5) * 255)
  , round((0 * 0.5 + 0.5) * 255)
  , round((1 * 0.5 + 0.5) * 255)
  ) =
    (128, 128, 255) =
      ( round(128 / 255 * 2 - 1)
      , round(128 / 255 * 2 - 1)
      , round(255 / 255 * 2 - 1)
      ) =
        (0, 0, 1)
```

Here you see the unit normal `(0, 0, 1)`
converted to flat blue `(128, 128, 255)`
and flat blue converted to the unit normal.
You'll learn more about this in the [normal mapping](normal-mapping.md) technique.

<p align="center">
<img src="https://i.imgur.com/R9FgZKx.png" alt="Specular Map" title="Specular Map">
</p>

Up above is one of the specular maps used.
The red and blue channel work to control the amount of specular reflection seen based on the camera angle.
The green channel controls the shininess factor.
You'll learn more about this in the [lighting](lighting.md) and [fresnel factor](fresnel-factor.md) sections.

The reflection and refraction textures mask off the objects that are either reflective, refractive, or both.
For the reflection texture, the red channel controls the amount of reflection and the green channel controls how
clear or blurry the reflection is.

### Panda3D

The example code uses
[Panda3D](https://www.panda3d.org/)
as the glue between the shaders.
This has no real influence over the techniques described,
meaning you'll be able to take what you learn here and apply it to your stack or game engine of choice.
Panda3D does provide some conveniences.
I have pointed these out so you can either find an equivalent convenience provided by your stack or
replicate it yourself, if your stack doesn't provide something equivalent.

Three Panda3D configurations were changed for the purposes of the demo program.
You can find these in [config.prc](../demonstration/config.prc).
The configurations changed were
`gl-coordinate-system default`,
`textures-power-2 down`, and
`textures-auto-power-2 1`.
Refer to the
[Panda3D configuration](http://www.panda3d.org/manual/?title=Configuring_Panda3D)
page in the manual for more details.

Panda3D defaults to a z-up, right-handed coordinate system while OpenGL uses a y-up, right-handed system.
`gl-coordinate-system default` keeps you from having to translate between the two inside your shaders.
`textures-auto-power-2 1` allows us to use texture sizes that are not a power of two if the system supports it.
This comes in handy when doing SSAO and other screen/window sized related techniques since the screen/window size
is usually not a power of two.
`textures-power-2 down` downsizes our textures to a power of two if the system only supports texture sizes being a power of two.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](gamma-correction.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](building-the-demo.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/sharpen.md`

[:arrow_backward:](pixelization.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](dilation.md)

# 3D Game Shaders For Beginners

## Sharpen

<p align="center">
<img src="https://i.imgur.com/VFDKNvl.gif" alt="Sharpen" title="Sharpen">
</p>

The sharpen effect increases the contrast at the edges of the image.
This comes in handy when your graphics are bit too soft.

```c
  // ...

  float amount = 0.8;

  // ...
```

You can control how sharp the result is by adjusting the amount.
An amount of zero leaves the image untouched.
Try negative values for an odd look.

```c
  // ...

  float neighbor = amount * -1;
  float center   = amount * 4 + 1;

  // ...
```

Neighboring fragments are multiplied by `amount * -1`.
The current fragment is multiplied by `amount * 4 + 1`.

```c
  // ...

  vec3 color =
        texture(sharpenTexture, vec2(gl_FragCoord.x + 0, gl_FragCoord.y + 1) / texSize).rgb
      * neighbor

      + texture(sharpenTexture, vec2(gl_FragCoord.x - 1, gl_FragCoord.y + 0) / texSize).rgb
      * neighbor
      + texture(sharpenTexture, vec2(gl_FragCoord.x + 0, gl_FragCoord.y + 0) / texSize).rgb
      * center
      + texture(sharpenTexture, vec2(gl_FragCoord.x + 1, gl_FragCoord.y + 0) / texSize).rgb
      * neighbor

      + texture(sharpenTexture, vec2(gl_FragCoord.x + 0, gl_FragCoord.y - 1) / texSize).rgb
      * neighbor
      ;

  // ...
```

The neighboring fragments are up, down, left, and right.
After multiplying both the neighbors and the current fragment by their particular values, sum the result.

```c
    // ...

    fragColor = vec4(color, texture(sharpenTexture, texCoord).a);

    // ...
```

This sum is the final fragment color.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [sharpen.frag](../demonstration/shaders/fragment/sharpen.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](pixelization.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](dilation.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/ssao.md`

[:arrow_backward:](bloom.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](motion-blur.md)

# 3D Game Shaders For Beginners

## Screen Space Ambient Occlusion (SSAO)

<p align="center">
<img src="https://i.imgur.com/o7lCukD.gif" alt="SSAO" title="SSAO">
</p>

SSAO is one of those effects you never knew you needed and can't live without once you have it.
It can take a scene from mediocre to wow!
For fairly static scenes, you can bake ambient occlusion into a texture but for more dynamic scenes, you'll need a shader.
SSAO is one of the more fairly involved shading techniques, but once you pull it off, you'll feel like a shader master.

By using only a handful of textures, SSAO can approximate the
[ambient occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion)
of a scene.
This is faster than trying to compute the ambient occlusion by going through all of the scene's geometry.
These handful of textures all originate in screen space giving screen space ambient occlusion its name.

### Inputs

The SSAO shader will need the following inputs.

- Vertex position vectors in view space.
- Vertex normal vectors in view space.
- Sample vectors in tangent space.
- Noise vectors in tangent space.
- The camera lens' projection matrix.

### Vertex Positions

<p align="center">
<img src="https://i.imgur.com/gr7IxKv.png" alt="Panda3D Vertex Positions" title="Panda3D Vertex Positions">
</p>

Storing the vertex positions into a framebuffer texture is not a necessity.
You can recreate them from the [camera's depth buffer](http://theorangeduck.com/page/pure-depth-ssao).
This being a beginners guide, I'll avoid this optimization and keep it straight forward.
Feel free to use the depth buffer, however, for your implementation.

```cpp
PT(Texture) depthTexture =
  new Texture("depthTexture");
depthTexture->set_format
  ( Texture::Format::F_depth_component32
  );

PT(GraphicsOutput) depthBuffer =
  graphicsOutput->make_texture_buffer
    ( "depthBuffer"
    , 0
    , 0
    , depthTexture
    );
depthBuffer->set_clear_color
  ( LVecBase4f(0, 0, 0, 0)
  );

NodePath depthCameraNP =
  window->make_camera();
DCAST(Camera, depthCameraNP.node())->set_lens
  ( window->get_camera(0)->get_lens()
  );
PT(DisplayRegion) depthBufferRegion =
  depthBuffer->make_display_region
    ( 0
    , 1
    , 0
    , 1
    );
depthBufferRegion->set_camera(depthCameraNP);
```

If you do decide to use the depth buffer, here's how you can set it up using Panda3D.

```c
in vec4 vertexPosition;

out vec4 fragColor;

void main() {
  fragColor = vertexPosition;
}
```

Here's the simple shader used to render out the view space vertex positions into a framebuffer texture.
The more involved work is setting up the framebuffer texture such that the fragment vector components it receives
are not clamped to `[0, 1]` and that each one has a high enough precision (a high enough number of bits).
For example, if a particular interpolated vertex position is `<-139.444444566, 0.00000034343, 2.5>`,
you don't want it stored into the texture as `<0.0, 0.0, 1.0>`.

```c
  // ...

  FrameBufferProperties fbp = FrameBufferProperties::get_default();

  // ...

  fbp.set_rgba_bits(32, 32, 32, 32);
  fbp.set_rgb_color(true);
  fbp.set_float_color(true);

  // ...
```

Here's how the example code sets up the framebuffer texture to store the vertex positions.
It wants 32 bits per red, green, blue, and alpha components and disables clamping the values to `[0, 1]`
The `set_rgba_bits(32, 32, 32, 32)` call sets the bits and also disables the clamping.

```c
  glTexImage2D
    ( GL_TEXTURE_2D
    , 0
    , GL_RGB32F
    , 1200
    , 900
    , 0
    , GL_RGB
    , GL_FLOAT
    , nullptr
    );
```

Here's the equivalent OpenGL call.
`GL_RGB32F` sets the bits and also disables the clamping.

<blockquote>
If the color buffer is fixed-point, the components of the source and destination
values and blend factors are each clamped to [0, 1] or [−1, 1] respectively for
an unsigned normalized or signed normalized color buffer prior to evaluating the blend
equation.
If the color buffer is floating-point, no clamping occurs.
<br>
<br>
<footer>
<a href="https://www.khronos.org/registry/OpenGL/specs/gl/glspec44.core.pdf">Source</a>
</footer>
</blockquote>

<p align="center">
<img src="https://i.imgur.com/V4nETME.png" alt="OpenGL Vertex Positions" title="OpenGL Vertex Positions">
</p>

Here you see the vertex positions with y being the up vector.

Recall that Panda3D sets z as the up vector but OpenGL uses y as the up vector.
The position shader outputs the vertex positions with z being up since Panda3D
was configured with `gl-coordinate-system default`.

### Vertex Normals

<p align="center">
<img src="https://i.imgur.com/ilnbkzq.gif" alt="Panda3d Vertex Normals" title="Panda3d Vertex Normals">
</p>

You'll need the vertex normals to correctly orient the samples you'll take in the SSAO shader.
The example code generates multiple sample vectors distributed in a hemisphere
but you could use a sphere and do away with the need for normals all together.

```c
in vec3 vertexNormal;

out vec4 fragColor;

void main() {
  vec3 normal = normalize(vertexNormal);

  fragColor = vec4(normal, 1);
}
```

Like the position shader, the normal shader is simple as well.
Be sure to normalize the vertex normal and remember that they are in view space.

<p align="center">
<img src="https://i.imgur.com/ucdx9Kp.gif" alt="OpenGL Vertex Normals" title="OpenGL Vertex Normals">
</p>

Here you see the vertex normals with y being the up vector.

Recall that Panda3D sets z as the up vector but OpenGL uses y as the up vector.
The normal shader outputs the vertex positions with z being up since Panda3D
was configured with `gl-coordinate-system default`.

<p align="center">
<img src="https://i.imgur.com/fiHXBex.gif" alt="SSAO using the normal maps." title="SSAO using the normal maps.">
</p>

Here you see SSAO being used with the normal maps instead of the vertex normals.
This adds an extra level of detail and will pair nicely with the normal mapped lighting.

```c
    // ...

    normal =
      normalize
        ( normalTex.rgb
        * 2.0
        - 1.0
        );
    normal =
      normalize
        ( mat3
            ( tangent
            , binormal
            , vertexNormal
            )
        * normal
        );

    // ...
```

To use the normal maps instead,
you'll need to transform the normal mapped normals from tangent space to view space
just like you did in the lighting calculations.

### Samples

To determine the amount of ambient occlusion for any particular fragment,
you'll need to sample the surrounding area.
The more samples you use, the better the approximation at the cost of performance.

```cpp
  // ...

  for (int i = 0; i < numberOfSamples; ++i) {
    LVecBase3f sample =
      LVecBase3f
        ( randomFloats(generator) * 2.0 - 1.0
        , randomFloats(generator) * 2.0 - 1.0
        , randomFloats(generator)
        ).normalized();

    float rand = randomFloats(generator);
    sample[0] *= rand;
    sample[1] *= rand;
    sample[2] *= rand;

    float scale = (float) i / (float) numberOfSamples;
    scale = lerp(0.1, 1.0, scale * scale);
    sample[0] *= scale;
    sample[1] *= scale;
    sample[2] *= scale;

    ssaoSamples.push_back(sample);
  }

  // ...
```

The example code generates a number of random samples distributed in a hemisphere.
These `ssaoSamples` will be sent to the SSAO shader.

```cpp
    LVecBase3f sample =
      LVecBase3f
        ( randomFloats(generator) * 2.0 - 1.0
        , randomFloats(generator) * 2.0 - 1.0
        , randomFloats(generator) * 2.0 - 1.0
        ).normalized();
```

If you'd like to distribute your samples in a sphere instead,
change the random `z` component to range from negative one to one.

### Noise

```c
  // ...

  for (int i = 0; i < numberOfNoise; ++i) {
    LVecBase3f noise =
      LVecBase3f
        ( randomFloats(generator) * 2.0 - 1.0
        , randomFloats(generator) * 2.0 - 1.0
        , 0.0
        );

    ssaoNoise.push_back(noise);
  }

  // ...
```

To get a good sweep of the sampled area, you'll need to generate some noise vectors.
These noise vectors will randomly tilt the hemisphere around the current fragment.

### Ambient Occlusion

<p align="center">
<img src="https://i.imgur.com/KKt74VE.gif" alt="SSAO Texture" title="SSAO Texture">
</p>

SSAO works by sampling the view space around a fragment.
The more samples that are below a surface, the darker the fragment color.
These samples are positioned at the fragment and pointed in the general direction of the vertex normal.
Each sample is used to look up a position in the position framebuffer texture.
The position returned is compared to the sample.
If the sample is farther away from the camera than the position, the sample counts towards the fragment being occluded.

<p align="center">
<img src="https://i.imgur.com/Nm4CJDN.gif" alt="SSAO Sampling" title="SSAO Sampling">
</p>

Here you see the space above the surface being sampled for occlusion.

```c
  // ...

  float radius    = 1;
  float bias      = 0.01;
  float magnitude = 1.5;
  float contrast  = 1.5;

  // ...
```

Like some of the other techniques,
the SSAO shader has a few control knobs you can tweak to get the exact look you're going for.
The `bias` adds to the sample's distance from the camera.
You can use the bias to combat "acne".
The `radius` increases or decreases the coverage area of the sample space.
The `magnitude` either lightens or darkens the occlusion map.
The `contrast` either washes out or increases the starkness of the occlusion map.

```c
  // ...

  vec4 position =           texture(positionTexture, texCoord);
  vec3 normal   = normalize(texture(normalTexture,   texCoord).xyz);

  int  noiseX = int(gl_FragCoord.x - 0.5) % 4;
  int  noiseY = int(gl_FragCoord.y - 0.5) % 4;
  vec3 random = noise[noiseX + (noiseY * 4)];

  // ...
```

Retrieve the position, normal, and random vector for later use.
Recall that the example code created a set number of random vectors.
The random vector is chosen based on the current fragment's screen position.

```c
  // ...

  vec3 tangent  = normalize(random - normal * dot(random, normal));
  vec3 binormal = cross(normal, tangent);
  mat3 tbn      = mat3(tangent, binormal, normal);

  // ...
```

Using the random and normal vectors, assemble the tangent, binormal, and normal matrix.
You'll need this matrix to transform the sample vectors from tangent space to view space.

```c
  // ...

  float occlusion = NUM_SAMPLES;

  for (int i = 0; i < NUM_SAMPLES; ++i) {
    // ...
  }

  // ...
```

With the matrix in hand, the shader can now loop through the samples, subtracting how many are not occluded.

```c
    // ...

    vec3 samplePosition = tbn * samples[i];
         samplePosition = position.xyz + samplePosition * radius;

    // ...
```

Using the matrix, position the sample near the vertex/fragment position and scale it by the radius.

```c
    // ...

    vec4 offsetUV      = vec4(samplePosition, 1.0);
         offsetUV      = lensProjection * offsetUV;
         offsetUV.xyz /= offsetUV.w;
         offsetUV.xy   = offsetUV.xy * 0.5 + 0.5;

    // ...
```

Using the sample's position in view space, transform it from view space to clip space to UV space.

```c
-1 * 0.5 + 0.5 = 0
 1 * 0.5 + 0.5 = 1
```

Recall that clip space components range from negative one to one and that UV coordinates range from zero to one.
To transform clip space coordinates to UV coordinates, multiply by one half and add one half.

```c
    // ...

    vec4 offsetPosition = texture(positionTexture, offsetUV.xy);

    float occluded = 0;
    if (samplePosition.y + bias <= offsetPosition.y) { occluded = 0; } else { occluded = 1; }

    // ...
```

Using the offset UV coordinates,
created by projecting the 3D sample onto the 2D position texture,
find the corresponding position vector.
This takes you from view space to clip space to UV space back to view space.
The shader takes this round trip to find out if some geometry is behind, at, or in front of this sample.
If the sample is in front of or at some geometry, this sample doesn't count towards the fragment being occluded.
If the sample is behind some geometry, this sample counts towards the fragment being occluded.

```c
    // ...

    float intensity =
      smoothstep
        ( 0.0
        , 1.0
        ,   radius
          / abs(position.y - offsetPosition.y)
        );
    occluded *= intensity;

    occlusion -= occluded;

    // ...
```

Now weight this sampled position by how far it is inside or outside the radius.
Finally, subtract this sample from the occlusion factor since it assumes all of the samples are occluded before the loop.

```c
    // ...

    occlusion /= NUM_SAMPLES;

    // ...

    fragColor = vec4(vec3(occlusion), position.a);

    // ...
```

Divide the occluded count by the number of samples to scale the occlusion factor from `[0, NUM_SAMPLES]` to `[0, 1]`.
Zero means full occlusion and one means no occlusion.
Now assign the occlusion factor to the fragment's color and you're done.

```c
    // ...

    fragColor = vec4(vec3(occlusion), position.a);

    // ...
```

For the demo's purposes,
the example code sets the alpha channel to alpha channel of the position framebuffer texture to avoid covering up the background.

### Blurring

<p align="center">
<img src="https://i.imgur.com/QsqOhFR.gif" alt="SSAO Blur Texture" title="SSAO Blur Texture">
</p>

The SSAO framebuffer texture is noisy as is.
You'll want to blur it to remove the noise.
Refer back to the section on [blurring](blur.md).
For the best results, use a median or Kuwahara filter to preserve the sharp edges.

### Ambient Color

```c
  // ...

  vec2 ssaoBlurTexSize  = textureSize(ssaoBlurTexture, 0).xy;
  vec2 ssaoBlurTexCoord = gl_FragCoord.xy / ssaoBlurTexSize;
  float ssao            = texture(ssaoBlurTexture, ssaoBlurTexCoord).r;

  vec4 ambient = p3d_Material.ambient * p3d_LightModel.ambient * diffuseTex * ssao;

  // ...
```

The final stop for SSAO is back in the lighting calculation.
Here you see the occlusion factor being looked up in the
SSAO framebuffer texture and then included in the ambient light calculation.

### Source

- [main.cxx](../demonstration/src/main.cxx)
- [basic.vert](../demonstration/shaders/vertex/basic.vert)
- [base.vert](../demonstration/shaders/vertex/base.vert)
- [base.frag](../demonstration/shaders/fragment/base.frag)
- [position.frag](../demonstration/shaders/fragment/position.frag)
- [normal.frag](../demonstration/shaders/fragment/normal.frag)
- [ssao.frag](../demonstration/shaders/fragment/ssao.frag)
- [median-filter.frag](../demonstration/shaders/fragment/median-filter.frag)
- [kuwahara-filter.frag](../demonstration/shaders/fragment/kuwahara-filter.frag)

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](bloom.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](motion-blur.md)

---

## Fuente: `3d-game-shaders-for-beginners/sections/texturing.md`

[:arrow_backward:](render-to-texture.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](lighting.md)

# 3D Game Shaders For Beginners

## Texturing

<p align="center">
<img src="https://i.imgur.com/cqbgT8b.gif" alt="Diffuse Texture Only" title="Diffuse Texture Only">
</p>

Texturing involves mapping some color or some other kind of vector to a fragment using UV coordinates.
Both U and V range from zero to one.
Each vertex gets a UV coordinate and this is outputted in the vertex shader.

<p align="center">
<img src="https://i.imgur.com/JjAdNfk.png" alt="UV Interpolation" title="UV Interpolation">
</p>

The fragment shader receives the UV coordinate interpolated.
Interpolated meaning the UV coordinate for the fragment is somewhere between the UV coordinates
for the vertexes that make up the triangle face.

### Vertex

```c
#version 150

uniform mat4 p3d_ModelViewProjectionMatrix;

in vec2 p3d_MultiTexCoord0;

in vec4 p3d_Vertex;

out vec2 texCoord;

void main()
{
  texCoord = p3d_MultiTexCoord0;

  gl_Position = p3d_ModelViewProjectionMatrix * p3d_Vertex;
}
```

Here you see the vertex shader outputting the texture coordinate to the fragment shader.
Notice how it's a two dimensional vector.
One dimension for U and one for V.

### Fragment

```c
#version 150

uniform sampler2D p3d_Texture0;

in vec2 texCoord;

out vec2 fragColor;

void main()
{
  texColor = texture(p3d_Texture0, texCoord);

  fragColor = texColor;
}
```

Here you see the fragment shader looking up the color at its UV coordinate and outputting that as the fragment color.

#### Screen Filled Texture

```c
#version 150

uniform sampler2D screenSizedTexture;

out vec2 fragColor;

void main()
{
  vec2 texSize  = textureSize(texture, 0).xy;
  vec2 texCoord = gl_FragCoord.xy / texSize;

  texColor = texture(screenSizedTexture, texCoord);

  fragColor = texColor;
}
```

When performing render to texture, the mesh is a flat rectangle with the same aspect ratio as the screen.
Because of this, you can calculate the UV coordinates knowing only
A) the width and height of the screen sized texture being UV mapped to the rectangle and
B) the fragment's x and y coordinate.
To map x to U, divide x by the width of the input texture.
Similarly, to map y to V, divide y by the height of the input texture.
You'll see this technique used in the example code.

## Copyright

(C) 2019 David Lettier
<br>
[lettier.com](https://www.lettier.com)

[:arrow_backward:](render-to-texture.md)
[:arrow_double_up:](../README.md)
[:arrow_up_small:](#)
[:arrow_down_small:](#copyright)
[:arrow_forward:](lighting.md)

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
