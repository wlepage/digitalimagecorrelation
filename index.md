---
layout: default
published: true
use_math: true
---

Digital image correlation (DIC) is a surface displacement measurement technique that can capture the shape, motion, and deformation of solid objects. Rudimentary DIC results are easy to obtain, but reliable, high-quality DIC results can be difficult to achieve. The goal of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is to equip new DIC practitioners with the fundamentals and best practices of DIC so they can produce optimum measurements in a time-efficient manner. 

The content of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is organized for DIC learners to gather the most important information by reading from start to finish, while more experienced users can jump ahead to a section of interest. The subject matter is intentionally simplified to be accessible to engineers of all skill levels, including undergraduates. Mathematical definitions and derivations are avoided, but should be reviewed and understood by DIC practitioners once their basic skill level is established. At the conclusion of each section, suggestions are provided for more detailed resources.

<a name="fundamentals"></a>
# DIC fundamentals
The basic operation of DIC is tracking a pattern (often called a [_speckle pattern_](#patterning)) in a sequence of images. The first image in the sequence is defined as the _reference_ image, or the baseline to which the other images are compared. DIC matches the pattern between the reference image and a deformed image, and then calculates the pattern's displacements between the reference and deformed images.

The basic process of a DIC calculation is illustrated below.
(a) The reference image has a recognizable pattern of dots that will be tracked.
(b) A portion of the pattern, called a _subset_, is selected for tracking.
(c) The center of the subset (the red dot, which is _not_ part of the speckle pattern) is the place in the reference image from which the displacement will be calculated.
(d) After the material is deformed from the reference image's initial position, the subset in the deformed image is matched to the subset from the reference image. 
(e) Once the subset is matched, DIC calculates the subset center's relative displacement between the reference and deformed images. The displacement here is the (small) difference between the blue and red dots. The next example will show how this basic operation is extended to multiple subsets and DIC points. 
<br /><br />![DIC subset]({{site.baseurl}}/assets/img/DICsubset-01.png)<br /><br />

The previous example computed the displacements from one subset, but DIC computes a _field_ of displacements by tracking multiple subsets. The same procedure as before is repeated, except this time with four equally-sized subsets in a two-by-two grid. This yields four more points with displacement information, for a total of five data points.
<br /><br />![DIC subsets]({{site.baseurl}}/assets/img/DICsubsets-01.png)<br /><br />

From the five subsets (one from the first example, and four more from the second example), there are five total points for which the displacements have been calculated. Each of these points can be referred to as a _DIC point_. 

Two important dimensions in a DIC calculation are the _subset size_ and the _step size_. The subset size is the width and height of the subset square in the reference image. The step size is the distance between subset centers. Both the subset size and step size are measured in units of pixels. Since DIC calculations are performed on images with inherent units of pixels, DIC algorithms are length-scale independent. The length scale of the displacements (e.g. millimeters) is introduced by the magnification of the images.

The displacement at each DIC point is a vector, so the components of the vector can be decomposed. For two dimensions of displacement, the components can be written in a Cartesian coordinate system as the horizontal displacement (_u_) and vertical displacement (_v_). Three dimensions of displacements (_u_, _v_, and _w_) can also be measured with a more complicated type of DIC that uses triangulation -- more on this in the section on the [main types of DIC](#DICtypes).
<br /><br />![DIC points]({{site.baseurl}}/assets/img/DICfivepoints-01.png)<br /><br />

DIC is commonly utilized to study the mechanical properties of solids. One of the most common experiments for solid materials is a _uniaxial tension_ experiment, shown in the schematic below. The goal of this experiment is to quantify how much the material deforms when a force is applied. There are many different ways to measure the deformation of the material, including strain gauges, extensometers (mechanical, laser, or optical), and DIC. While strain gauges and extensometers provide a single measurement of strain or displacement in the material, DIC can provide many displacement measurements across the material. With displacements across the material, DIC can capture the local deformations that arise from inhomogeneity, cracking, stress concentrations, plastic instabilities, phase transformations, and other localized material phenomena.
<br /><br />![DIC basics]({{site.baseurl}}/assets/img/DICbasics-01.png)<br /><br />

### Further reading
1. Sutton, Michael A., Jean Jose Orteu, and Hubert Schreier. Image correlation for shape, motion and deformation measurements: basic concepts, theory and applications. Springer Science & Business Media, 2009. [https://doi.org/10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)
1. Michel Bornert, François Hild, Jean-José Orteu and Stéphane Roux. Digital image correlation. Chapter 6 of _Full-field measurements and identification in solid mechanics_, Grédiac, Michel, and François Hild, eds. John Wiley & Sons, 2012. [http://doi.org/10.1002/9781118578469.ch6](http://doi.org/10.1002/9781118578469.ch6)
1. François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012.

<a name="DICtypes"></a>
# General types of DIC algorithms
One way to categorize DIC algorithms is by the dimensions of the calculated displacements. For images collected by just one camera, only two dimensions of displacements can be known. This is called two-dimensional, or _2-D DIC_ (also commonly written as 2D-DIC). When images from more than one camera are used, depth can be measured with triangulation. This is called three-dimensional, or _3-D DIC_ (also commonly written as 3D-DIC). 

2-D DIC assumes that the sample's deformations are constrained to a plane that is parallel to the camera. In practice, out-of-plane motion can be a large source of error for 2-D DIC (Sutton, et al. [doi:10.1016/j.optlaseng.2008.05.005](https://doi.org/10.1016/j.optlaseng.2008.05.005)). Also, images can have distortions that introduce error into DIC measurements. For example, camera lenses and optical microscopes generally have barrel distortions. 

For 3-D DIC, out of plane deformations are measured with triangulation. As long as the sample remains in focus, then the out-of-plane deformations do not introduce error in 3-D DIC (unlike 2-D DIC). Furthermore, imaging distortions are corrected in 3-D DIC through a calibration procedure. See the [calibration](#calibration)) section or more details about calibrating 3-D DIC systems. Another benefit of the 3-D DIC calibration process is that the length scale of the images are accurately connected to the physical length scale of the imaging system. In contrast, the length scale of 2-D DIC is introduced by a simple and less accurate conversion between the pixel size of the images to the physical size of the images (e.g. millimeters). 

An important note is that 3-D DIC can only measure displacements on the surface of a material, not within the three-dimensional volume of a material. This extension of DIC from pixels to _voxels_ (three-dimensional pixels) is called digital _volume_ correlation (DVC). To measure displacements within a solid, the imaging system must be able to see inside the material, and the algorithms of DIC must be extended to capture displacements through the volume. Two examples of imaging systems that can see inside materials are X-ray tomography and confocal microscopy.

A second way to categorize DIC algorithms is by the pattern matching technique. The pattern can be separated into multiple subsets that are individually matched. This is called _local DIC_. Alternatively, the pattern can be matched in one go using a finite-element based approach. This is called _global DIC_. Local DIC was introduced before global DIC, and local DIC is more popular. Many of the principles in this guide apply to both local and global DIC, but details that only apply to local DIC (such as subsets) are included.

### Further reading
1. (2-D and 3-D DIC) Sutton, M. A., et al. "The effect of out-of-plane motion on 2D and 3D digital image correlation measurements." Optics and Lasers in Engineering 46.10 (2008): 746-757. [https://doi.org/10.1016/j.optlaseng.2008.05.005](https://doi.org/10.1016/j.optlaseng.2008.05.005)
1. (digital volume correlation, DVC) Franck, C., et al. "Three-dimensional full-field measurements of large deformations in soft materials using confocal microscopy and digital volume correlation." Experimental Mechanics 47.3 (2007): 427-438. [https://doi.org/10.1007/s11340-007-9037-9](https://doi.org/10.1007/s11340-007-9037-9)
1. (local and global DIC) François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012. 

<a name="patterning"></a>
# Speckle patterning

To match the reference and deformed images, DIC tracks features on the sample surface that collectively form the _speckle pattern_. Occasionally, a sample's surface will inherently have features that suffice for a _natural_ speckle pattern, but typically an _artificial_ speckle pattern must be applied to the sample. The quality of DIC results are strongly dependent on the speckle pattern, and optimum speckle patterns meet the following conditions.
1. The pattern covers the sample surface in the area of interest. 
1. The pattern moves and deforms with the sample, but does not exert a significant mechanical stress on the sample. In other words, the pattern is fully adhered to the sample, but deforms extremely easily compared to the sample. 
1. The features that comprise the pattern (the _speckles_) are random in position but uniform in size. 
1. The speckle size is at least 3 pixels to avoid aliasing (Bruck, et al. [doi:10.1007/BF02321405](https://doi.org/10.1007/BF02321405)), but not much more than 7 pixels to achieve a relatively high density of DIC points (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)). If speckles are much larger than 7 pixels, then there will be relatively few DIC data points possible. Also, note that these speckle sizes are not averages, but are rather the range of the smallest and largest speckles (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)). Here is an example of a calculation to estimate the desired speckle size range: 
```
12 mm / 2048 px * (3 to 7 px per speckle) = 18 to 41 microns per speckle
```
1. The pattern has good grayscale contrast, which reduces error (Sutton, Orteu, Schreier. [doi:10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)). One way to visualize this contrast is a histogram: with the number of pixels plotted with respect to grayscale level, the pattern has a mix of dark and bright pixels, indicated by two peaks in the histogram's spectrum, and the separation between the two peaks is broad. Ideally, the two peaks look like a bimodal Gaussian distribution. 
1. The pattern has a speckle density of about 50%. When the pattern has either too few or too many speckles, then this results in features that are both too big and too small (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)).
1. The pattern is stable in the testing environment. For example, for a high-temperature experiment, the pattern does not decay or darken under heating.

### Speckle patterning methods
In most cases, the sample's natural surface is not the best pattern that could be achieved. There are many ways to apply artificial speckle patterns, and the main techniques are listed below.

#### Paint
Painted speckle patterns are popular because paint is relatively compliant to most engineering materials, and high-quality speckle patterns can be applied quickly with spraying paint (e.g. spray cans or airbrushes). Since paint colors other than black and white will inherently have less contrast, black and white paints are recommended. Using white paint as the background and black as the speckles is favored over the converse order because black paint maintains better contrast over white paint (LePage, Shaw, Daly. [doi:10.1007/s40799-017-0192-3](https://doi.org/10.1007/s40799-017-0192-3)). If the sample will undergo large deformations and/or high strain rates, then plan to perform the experiment within 24 to 48 hours of painting. As the paint dries and hardens, it loses its ability to deform with the sample (Reu. [doi:10.1111/ext.12147](http://doi.org/10.1111/ext.12147)).

#### Inks and dyes
For hyperelastic materials (including many elastomers, polymers, and biomaterials), paint does not stretch enough to track with the sample as a speckle pattern. Inks and dyes that permeate the sample material can be viable speckle pattern options, 

#### Powder particles
#### Nanoparticles
#### Lithographed patterns: EBL or photolitho


### Further reading
1. Reu, Phillip. "All about speckles: aliasing." Experimental Techniques 38.5 (2014): 1-3. [http://doi.org/10.1111/ext.12111](http://doi.org/10.1111/ext.12111)
1. Sutton, Michael A., Jean Jose Orteu, and Hubert Schreier. Image correlation for shape, motion and deformation measurements: basic concepts, theory and applications. Springer Science & Business Media, 2009. [https://doi.org/10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)
1. Reu, Phillip. "All about speckles: speckle size measurement." Experimental Techniques 38.6 (2014): 1-2. [http://doi.org/10.1111/ext.12110](http://doi.org/10.1111/ext.12110)
1. Reu, Phillip. "Hidden Components of 3D‐DIC: Interpolation and Matching--Part 2." Experimental Techniques 36.3 (2012): 3-4. [http://doi.org/10.1111/j.1747-1567.2012.00838.x](http://doi.org/10.1111/j.1747-1567.2012.00838.x)

<a name="imaging"></a>
# Image capturing

+ Image capturing: cameras, microscopes, and more
+ Setup photos, cross polarization
+ Common cameras, lenses, and lights

<a name="subsetssplines"></a>
# Subsets, splines, and sub-pixel interpolation

+ Subset size selection, spline interpolation, and saturated pixels (at least 3 specks/subset = Big Red; bigger subsets = better pattern matching with reference image, but smooths out the DIC data (lower spatial resolution) and also increases computation time.) 

<a name="spatialtemporallimits"></a>
# Spatial and temporal resolution limits
Blurring (how fast to capture images?)
Noise floor (how small can you go?)


<a name="DICcodes"></a>
# Comparison of DIC codes

Common codes (open source and commercial, link to DIC Challenge)


Camera setup
* first check and clean the cameras, lenses, and filters (UV or polarized)
    * clean lenses and cameras are super important, but you can really mess stuff up if you introduce scratches, so be very careful
    * read this great guide from B&H on cleaning lenses and cameras: http://www.bhphotovideo.com/explora/photography/tips-and-solutions/how-clean-your-lens-and-filters
    * this guide is also good: https://www.borrowlenses.com/blog/2016/08/how-to-clean-a-camera-lens/
    * there are a couple different ways to look for dust
        1. by shining a flashlight on the lens or sensor cover
        2. by pointing the camera at a uniform, diffuse, bright light (e.g. light panel) and increasing the exposure just until the FOV is mostly saturated, then moving the camera and seeing and darker spots in the view that don't move while you're moving the camera
* cross polarize the lights and lenses to eliminate pernicious saturated pixels, and also boost the contrast a little (lowers errors by about 10%), https://doi.org/10.1007/s11340-016-0129-2 
* do not just blow air at the lenses from an air can or from your mouth
    * air cans and mouth blowing introduce moisture and condensation on the lens that leave a residue
    * use a photography type duster instead
    * if the duster doesn't get everything, then escalate to tissues
    * only use new, clean lens cleaning tissues that have been moistened with lens cleaning solution
    * the lens cleaning kit is stored in GGB 3673 on the shelf near the fume hood
* use the mid-range apertures, say f/5.6, f/8, or f/11 for an f/1.8 to f/22 lens (the more extreme apertures introduce more distortions in the imaging)
* see the "stereo-rig design" series from Phil Reu for lots of great info, starting with Part 1 of 4, Creating the Stereo-Rig Layout [Reu 2012, doi: 10.1111/j.1747-1567.2012.00871.x]
* good focus is critical
    * make sure that the most important region in your area of interest is the best-focused area
    * do not follow the directives of the Vic3D manual for focusing, which say to focus at the largest aperture setting (smallest number), and then close the aperture to the desired opening -- this is not a good idea because the depth of focus in the sample does not scale equally both towards and away from the camera whenever the aperture is closed (J. Wayne Jones in MSE, an avid photographer, confirmed that this is not how lenses behave, and one of Shaw's summer students Arnaud measured this)
* lighting should be uniform, bright, and diffuse
    * LED light panels are great
    * fiber optical illuminators are alright
* looking ahead to calibration, you want to make sure that your FOVs will have the calibration grid fill up as much of the FOV as possible without extending any of the calibration grid dots outside of the FOV; the calibration grid filling about 50% or more of the FOV is good
* be sure to clamp, tie or tape down the camera cables
* make a conscious effort to avoid touching the cameras and the cables at all!

<a name="calibration"></a>
# 3-D DIC calibration

* see the calibration series from Phil Reu [doi: 10.1111/ext.12048]
* if using a glass calibration grid, only indirectly backlight the grid
    * no direct light, front or back
    * use the white poster board instead of a piece of paper: matte finish is good
    * set the light intensity to just before saturation to get good contrast
* move the grid around in the field of view while taking pictures
    * do some images at extreme rotations (so long at the three main dots are in focus)
    * only rotations about the x and y axes matter
    * don't put the keyboard on the same table as the cameras as hitting the spacebar shakes the cameras and messes up the calibration
    * take 25-30 calibration images
* once the calibration analysis is complete, you can remove poorly matched image pairs by right clicking the row to improve the score
* calibration scores
    * below 0.100 is okay, below 0.050 is good, below 0.030 is great
    * the units on the calibration scores is residual pixels
    * calibration scores get worse for more and more extension tubes


