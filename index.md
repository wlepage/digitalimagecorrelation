---
layout: default
published: true
use_math: true
---

Digital image correlation \(DIC\) is a surface displacement measurement technique that can capture the shape, motion, and deformation of solid objects. Rudimentary DIC results are easy to obtain, but reliable, high-quality DIC results can be difficult to achieve. The goal of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is to equip new DIC practitioners with the fundamentals and best practices of DIC so they can produce optimum measurements in a time-efficient manner. 

The content of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is organized for DIC learners to gather the most important information by reading from start to finish, while more experienced users can jump ahead to a section of interest. The subject matter is intentionally simplified to be as accessible as possible to engineers of all skill levels, including undergraduates. Mathematical definitions and derivations are avoided, but should be reviewed by DIC practitioners once their basic skill level is established. At the conclusion of each section, suggestions are provided for more detailed resources.

<a name="fundamentals"></a>
# DIC fundamentals
The basic operation of DIC is tracking a pattern (often called a [_speckle pattern_](#patterning)) in a sequence of images. The first image in the sequence is defined as the _reference_ image, or the baseline to which the other images are compared. DIC matches the pattern between the reference image and a deformed image, and then calculates the pattern's displacements between the reference and deformed images.

The basic process of a DIC calculation is illustrated below.
(a) The reference image has a recognizable pattern of dots that will be tracked.
(b) A portion of the pattern, called a _subset_, is selected for tracking.<sup>[1](#footnotes-fundamentals)</sup>
(c) The center of the subset (the red dot, which is _not_ part of the speckle pattern) is the place in the reference image from which the displacement will be calculated.
(d) After the material is deformed from the reference image's initial position, the subset in the deformed image is matched to the subset from the reference image. 
(e) Once the subset is matched, DIC calculates the subset center's relative displacement between the reference and deformed images. The displacement here is the (small) difference between the blue and red dots. The next example will show how this basic operation is extended to multiple subsets and DIC points. 
<br /><br />![DIC subset]({{site.baseurl}}/assets/img/DICsubset-01.png)<br /><br />

The previous example computed the displacements from one subset, but DIC can compute a _field_ of displacements by tracking multiple subsets. The same procedure as before is repeated, except this time with four equally-sized subsets in a two-by-two grid. This yields four more points with displacement information, for a total of five data points.
<br /><br />![DIC subsets]({{site.baseurl}}/assets/img/DICsubsets-01.png)<br /><br />

From the five subsets (one from the first example, and four more from the second example), there are five total points for which the displacements have been calculated. Each of these points can be referred to as a _DIC point_. Two important dimensions in a DIC calculation are the _subset size_ and the _step size_. The subset size is the width and height of the subset square<sup>[2](#footnotes-fundamentals)</sup> in the reference image. The step size is the distance between subset centers. Both the subset size and step size are measured in units of pixels.

The displacement at each DIC point is a vector, so the components of the vector can be decomposed. For two dimensions of displacement, the components can be written in a Cartesian coordinate system as the horizontal displacement (_u_) and vertical displacement (_v_). Three dimensions of displacements (_u_, _v_, and _w_) can also be measured with a more complicated type of DIC that uses triangulation -- more on this in the section on the [main types of DIC](#DICtypes).
<br /><br />![DIC points]({{site.baseurl}}/assets/img/DICfivepoints-01.png)<br /><br />

DIC is commonly utilized to study the mechanical properties of solids. One of the most common experiments for solid materials is a _uniaxial tension_ experiment, shown in the schematic below. The goal of this experiment is to quantify how much the material deforms when a force is applied. There are many different ways to measure the deformation of the material, including strain gauges, extensometers (mechanical, laser, or optical), and DIC. While strain gauges and extensometers provide a single measurement of strain or displacement in the material, DIC can provide many displacement measurements across the material. 
<br /><br />![DIC basics]({{site.baseurl}}/assets/img/DICbasics-01.png)<br /><br />

<a name="footnotes-fundamentals"></a>
### Footnotes
1. The most DIC codes perform _local DIC_, which matches subsets of the pattern as described here. However, there are also _global DIC_ algorithms that match the entire pattern in one go. See more details on this in the section on [DIC types](#DICtypes).
2. The subsets in many local DIC codes are restricted to square shapes in the reference configuration, but some DIC codes permit non-square subsets (see [DIC codes](#DICcodes)).

### Further reading
1. Sutton, Michael A., Jean Jose Orteu, and Hubert Schreier. Image correlation for shape, motion and deformation measurements: basic concepts, theory and applications. Springer Science & Business Media, 2009. [https://doi.org/10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)
1. Michel Bornert, François Hild, Jean-José Orteu and Stéphane Roux. Digital image correlation. Chapter 6 of _Full-field measurements and identification in solid mechanics_, Grédiac, Michel, and François Hild, eds. John Wiley & Sons, 2012. [http://doi.org/10.1002/9781118578469.ch6](http://doi.org/10.1002/9781118578469.ch6)
1. François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012.

<a name="DICtypes"></a>
# General types of DIC algorithms
There are multiple ways to categorize DIC algorithms. One is by the dimensions of the calculated displacements. For images collected by just one camera, only two dimensions of displacements can be known. This is called two-dimensional, or _2-D DIC_ (also commonly written as 2D-DIC). When images from more than one camera are used, depth can be measured with triangulation. This is called three-dimensional, or _3-D DIC_ (also commonly written as 3D-DIC). An important note is that 3-D DIC can only measure displacements on the surface of a material, not within the three-dimensional volume of a material. To measure displacements within a solid, the imaging system must be able to see inside the material, and the algorithms of DIC must be extended to capture displacements through the volume. This extension of DIC from _pixels_ to _voxels_ is called digital _volume_ correlation (DVC). Two examples of imaging systems that can see inside materials are X-ray tomography and confocal microscopy.

A second way to categorize DIC algorithms is by the pattern matching technique. The pattern can be separated into multiple subsets that are individually matched. This is called _local DIC_. Alternatively, the pattern can be matched in one go using a finite-element based approach. This is called _global DIC_. 

### Further reading
1. (2-D and 3-D DIC) Sutton, M. A., et al. "The effect of out-of-plane motion on 2D and 3D digital image correlation measurements." Optics and Lasers in Engineering 46.10 (2008): 746-757. [https://doi.org/10.1016/j.optlaseng.2008.05.005](https://doi.org/10.1016/j.optlaseng.2008.05.005)
1. (digital volume correlation, DVC) Franck, C., et al. "Three-dimensional full-field measurements of large deformations in soft materials using confocal microscopy and digital volume correlation." Experimental Mechanics 47.3 (2007): 427-438. [https://doi.org/10.1007/s11340-007-9037-9](https://doi.org/10.1007/s11340-007-9037-9)
1. (local and global DIC) François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012. 

<a name="patterning"></a>
# Speckle patterning

To match the reference and deformed images, DIC tracks features on the sample surface that collectively form the _speckle pattern_. Occasionally, a sample's surface will inherently have features suffice for a _natural_ speckle pattern, but typically an _artificial_ speckle pattern must be applied to the sample. 

Let's test some inline math $x$, $y$, $x_1$, $y_1$.

And test a display math without equaltion number:
\begin{align\*}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{align\*}
Is it O.K.?

<a name="imaging"></a>
# Image capturing

<a name="DICcodes"></a>
# Comparison of DIC codes


+ 1.	DIC fundamentals
2.	Spline interpolation and saturated pixels
3.	Image capturing: cameras, microscopes, and more
6.	Setup photos, cross polarization
7.	Common cameras, lenses, and lights
+ 4.	2D vs 3D vs DVC
5.	Speckle patterning
	a.	General needs: size (aliasing), density, contrast (bimodal)
	b.	Methods: paint, inks and dyes, powder particles, nanoparticles
	c.	Multiscale (paper that you reviewed), Kammers

8.	Blurring (how fast to capture images?)
9.	Noise floor (how small can you go?)
10.	Common codes (open source and commercial, link to DIC Challenge)

