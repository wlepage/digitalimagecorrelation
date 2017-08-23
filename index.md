---
layout: default
published: true
use_math: false
---

Digital image correlation (DIC) is a surface displacement measurement technique that can capture the shape, motion, and deformation of solid objects. Rudimentary DIC results are easy to obtain, but reliable, high-quality DIC results can be difficult to achieve. The goal of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is to equip new DIC practitioners with the fundamentals and best practices of DIC so they can produce optimum measurements in a time-efficient manner. 

The content of [digitalimagecorrelation.org](http://digitalimagecorrelation.org/) is organized for DIC learners to gather the most important information by reading from start to finish, while more experienced users can jump ahead to a section of interest. The subject matter is intentionally simplified to be accessible to engineers of all skill levels, including undergraduates. Mathematical definitions and derivations are avoided, but should be reviewed and understood by DIC practitioners once their basic skill level is established. At the conclusion of each section, suggestions are provided for more detailed resources.

<a name="fundamentals"></a>
# 1. DIC fundamentals
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

#### Further reading
1. Sutton, Michael A., Jean Jose Orteu, and Hubert Schreier. Image correlation for shape, motion and deformation measurements: basic concepts, theory and applications. Springer Science & Business Media, 2009. [doi:10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)
1. Michel Bornert, François Hild, Jean-José Orteu and Stéphane Roux. Digital image correlation. Chapter 6 of _Full-field measurements and identification in solid mechanics_, Grédiac, Michel, and François Hild, eds. John Wiley & Sons, 2012. [doi:10.1002/9781118578469.ch6](http://doi.org/10.1002/9781118578469.ch6)
1. François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012.

<a name="DICtypes"></a>
# 2. Types of DIC algorithms
One way to categorize DIC algorithms is by the dimensions of the calculated displacements. For images collected by just one camera, only two dimensions of displacements can be known. This is called two-dimensional, or _2-D DIC_ (also commonly written as 2D-DIC). When images from more than one camera are used, depth can be measured with triangulation. This is called three-dimensional, or _3-D DIC_ (also commonly written as 3D-DIC). 

2-D DIC assumes that the sample's deformations are constrained to a plane that is parallel to the camera. In practice, out-of-plane motion can be a large source of error for 2-D DIC (Sutton, et al. [doi:10.1016/j.optlaseng.2008.05.005](https://doi.org/10.1016/j.optlaseng.2008.05.005)). Also, images can have distortions that introduce error into DIC measurements. For example, camera lenses and optical microscopes generally have barrel distortions. 

For 3-D DIC, out of plane deformations are measured with triangulation. As long as the sample remains in focus, then the out-of-plane deformations do not introduce error in 3-D DIC (unlike 2-D DIC). Furthermore, imaging distortions are corrected in 3-D DIC through a calibration procedure. See the [calibration](#calibration)) section or more details about calibrating 3-D DIC systems. Another benefit of the 3-D DIC calibration process is that the length scale of the images are accurately connected to the physical length scale of the imaging system. In contrast, the length scale of 2-D DIC is introduced by a simple and less accurate conversion between the pixel size of the images to the physical size of the images (e.g. millimeters). 

An important note is that 3-D DIC can only measure displacements on the surface of a material, not within the three-dimensional volume of a material. This extension of DIC from pixels to _voxels_ (three-dimensional pixels) is called digital _volume_ correlation (DVC). To measure displacements within a solid, the imaging system must be able to see inside the material, and the algorithms of DIC must be extended to capture displacements through the volume. Two examples of imaging systems that can see inside materials are X-ray tomography and confocal microscopy.

A comparison among 2-D DIC, 3-D DIC, and DVC is illustrated below.
<br /><br />![DIC types]({{site.baseurl}}/assets/img/DICtypes-01.png)<br /><br />

A second way to categorize DIC algorithms is by the pattern matching technique. The pattern can be separated into multiple subsets that are individually matched. This is called _local DIC_. Alternatively, the pattern can be matched in one go using a finite-element based approach. This is called _global DIC_. Local DIC was introduced before global DIC, and local DIC is more popular. Many of the principles in this guide apply to both local and global DIC, but details that only apply to local DIC (such as subsets) are included.

#### Further reading
1. (2-D and 3-D DIC) Sutton, M. A., et al. "The effect of out-of-plane motion on 2D and 3D digital image correlation measurements." Optics and Lasers in Engineering 46.10 (2008): 746-757. [doi:10.1016/j.optlaseng.2008.05.005](https://doi.org/10.1016/j.optlaseng.2008.05.005)
1. (digital volume correlation, DVC) Franck, C., et al. "Three-dimensional full-field measurements of large deformations in soft materials using confocal microscopy and digital volume correlation." Experimental Mechanics 47.3 (2007): 427-438. [doi:10.1007/s11340-007-9037-9](https://doi.org/10.1007/s11340-007-9037-9)
1. (local and global DIC) François Hild and Stéphane Roux. Digital image correlation. Chapter 5 of  _Optical methods for solid mechanics: a full-field approach_, Rastogi, Pramod K., and Erwin Hack, eds. John Wiley & Sons, 2012. 

<a name="patterning"></a>
# 3. Speckle patterning

To match the reference and deformed images, DIC tracks features on the sample surface that collectively form the _speckle pattern_. Occasionally, a sample's surface will inherently have features that suffice for a _natural_ speckle pattern, but typically an _artificial_ speckle pattern must be applied to the sample. The quality of DIC results are strongly dependent on the speckle pattern, and optimum speckle patterns meet the following conditions.
1. The pattern covers the sample surface in the area of interest. 
1. The pattern moves and deforms with the sample, but does not exert a significant mechanical stress on the sample. In other words, the pattern is fully adhered to the sample, but deforms extremely easily compared to the sample. 
1. The features that comprise the pattern (the _speckles_) are random in position but uniform in size. 
1. The speckle size is at least 3 pixels to avoid aliasing (Reu. [doi:10.1111/ext.12111](http://doi.org/10.1111/ext.12111)), but not much more than 7 pixels to achieve a relatively high density of DIC points (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)). If speckles are much larger than 7 pixels, then there will be relatively few DIC data points possible. Also, note that these speckle sizes are not averages, but are rather the range of the smallest and largest speckles (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)). Here is an example of a calculation to estimate the desired speckle size range: 
```
12 mm / 2048 px * (3 to 7 px per speckle) 
 = 18 to 41 microns per speckle
```
1. The pattern has good grayscale contrast, which reduces error (Sutton, Orteu, Schreier. [doi:10.1007/978-0-387-78747-3](https://doi.org/10.1007/978-0-387-78747-3)). One way to visualize this contrast is a histogram: with the number of pixels plotted with respect to grayscale level, the pattern has a mix of dark and bright pixels, indicated by two peaks in the histogram's spectrum, and the separation between the two peaks is broad. Ideally, the two peaks look like a bimodal Gaussian distribution. 
1. The pattern is stable in the testing environment. For example, for a high-temperature experiment, the pattern does not decay or darken under heating.
1. The pattern has a speckle density of about 50%. When the pattern has either too few or too many speckles, then this results in features that are both too big and too small (Reu. [doi:10.1111/ext.12110](http://doi.org/10.1111/ext.12110)). This concept is illustrated below. The artificial speckle patterns were generated with the Speckle Generator software from Correlated Solutions, Inc.

<br /><br />![Speckle densities]({{site.baseurl}}/assets/img/speckledensity-01.png)<br /><br />

### Speckle patterning methods
In most cases, the sample's natural surface is not the best pattern that could be achieved. There are many ways to apply artificial speckle patterns, and the main techniques are listed below.

#### Paint
Painted speckle patterns are popular because paint is relatively compliant to most engineering materials, and high-quality speckle patterns can be applied quickly with spraying paint. Since paint colors other than black and white will inherently have less contrast, black and white paints are recommended. Using white paint as the background and black as the speckles is favored over the converse order because black paint maintains better contrast over white paint (LePage, Shaw, Daly. [doi:10.1007/s40799-017-0192-3](https://doi.org/10.1007/s40799-017-0192-3)). 

If the sample will undergo large deformations and/or high strain rates, then plan to perform the experiment within 24 to 48 hours of painting. As the paint dries and hardens, it loses its ability to deform with the sample (Reu. [doi:10.1111/ext.12147](http://doi.org/10.1111/ext.12147)). A range of speckle sizes can be produced with sprayed paint. Artist grade airbrushes, such as the Iwata CM-B, can produce speckle sizes between 10 and 100 microns by varying the airbrush pressure (more pressure creates smaller speckles). Cans of spray paint can produce larger speckles, in the range of 100 to 1000 microns.

#### Inks and dyes
For hyperelastic materials (including many elastomers, polymers, and biomaterials), paint is not stretchy enough to track with the sample as a speckle pattern. Inks and dyes that permeate the sample material can be viable speckle pattern options. Stamping, masking, spraying, and stenciling can be deployed to apply the ink or dye. Some DIC practitioners use permanent markers, as well. 

#### Powder particles
For moist or sticky materials, powder particles may adhere better than paint. Graphite powder is popular for dark speckles, and alumina or magnesium oxide can be used for a white basecoat. Another use for powder patterns is achieving smaller speckles than painted patterns can produce. Using a combination of filters and compressed air, powder particle patterns smaller than 10 microns can be deposited on a smooth/polished sample to form a speckle pattern (Jonnalagadda, et al. [doi:10.1007/s11340-008-9212-7](https://doi.org/10.1007/s11340-008-9212-7)).

#### Nanoparticles
For even smaller speckles than powders (about 20 to 100 nanometer speckle size, for scanning electron microscopy digital image correlation), self-assembled nanoparticles can be utilized (Kammers and Daly, [doi:10.1007/s11340-013-9734-5](https://doi.org/10.1007/s11340-013-9734-5)). 

#### Lithographed patterns
Lithography is another method for achieving small speckle size, with the benefit of  a higher degree of control than most other microscale patterning methods (Cannon, et al. [doi:10.1007/978-3-319-51439-0_34](https://doi.org/10.1007/978-3-319-51439-0_34)).

#### Further reading
1. Dong, Y. L., and B. Pan. "A Review of Speckle Pattern Fabrication and Assessment for Digital Image Correlation." Experimental Mechanics (2017): 1-21. [doi:10.1007/s11340-017-0283-1](https://doi.org/10.1007/s11340-017-0283-1).
1. Kammers, A. D., and S. Daly. "Small-scale patterning methods for digital image correlation under scanning electron microscopy." Measurement Science and Technology 22.12 (2011): 125501. [doi:10.1088/0957-0233/22/12/125501](https://doi.org/10.1088/0957-0233/22/12/125501).
1. Reu, Phillip. "All about speckles: aliasing." Experimental Techniques 38.5 (2014): 1-3. [doi:10.1111/ext.12111](http://doi.org/10.1111/ext.12111)
1. Reu, Phillip. "Hidden Components of 3D‐DIC: Interpolation and Matching--Part 2." Experimental Techniques 36.3 (2012): 3-4. [doi:10.1111/j.1747-1567.2012.00838.x](http://doi.org/10.1111/j.1747-1567.2012.00838.x)

<a name="imaging"></a>
# 4. Image capturing

The key step of data collection for DIC is capturing images. In general, good photography or microscopy practices translate to good DIC images, but there are extra considerations for optimizing DIC results. 

The first consideration is selecting the appropriate image magnification. The image magnification depends on the length scale of the samples and phenomena that the experiments will investigate. The algorithms for DIC are inherently length scale independent, so the physical length scale conversion arises from the image magnification. For example, DIC has been performed on the length scale of meters to track the collapse of Mount St. Helens (Walter. [doi:10.1130/G32198.1](http://doi.org/10.1130/G32198.1)), all the way down to single atoms with transmission electron microscopy (Wang, et al. [doi:10.1115/1.4031332](https://doi.org/10.1115/1.4031332)). Most commonly, though, cameras are used to capture DIC images.

Building a successful DIC setup requires making the right equipment choices. For optical DIC systems with cameras, lenses, and lights, there are a few selection criteria that optimize the system. 

#### Tips on cameras, lenses, and lights
+ For DIC images, color is superfluous and can be problematic. The best practice is to select black-and-white cameras. Often, cameras that are marketed for machine vision applications are very suitable for DIC, as well.
+ The camera sensor should have low noise, high quantum efficiency, and high dynamic range. Historically, charge-coupled device (CCD) sensors have outperformed complementary metal–oxide–semiconductor (CMOS) sensors, but new advancements in sensor technologies have leveled the playing field between CCD sensors and the next-generation of CMOS sensors (e.g. Sony Pregius). 
+ Lenses should have low distortion. The best lenses for DIC are _telecentric_, which means that the sample's magnification does not vary within the lenses depth or field of view. 
+ For lenses with adjustable apertures, use the mid-range apertures, say f/5.6, f/8, or f/11 for an f/1.8 to f/22 lens (the more extreme apertures introduce more distortions in the imaging).
+ The lenses and cameras should be rigidly mounted on an optics table (ideally) or on a high-quality tripod, and sources of vibration should be minimized. Be sure to clamp, tie, or tape down the camera cables, too.
+ For systems with two or more cameras, much sure the cameras are viewing the same area. Small differences between the height of the epipolar lines can make calibration difficult (Reu. [doi:10.1111/ext.12083](10.1111/ext.12083)).
+ Good focus is critical. Make sure that the most important region in your area of interest is the best-focused area. 
+ Lighting should be evenly distributed along the sample's area of interest. The lighting should be intense enough to achieve sufficient exposure for the images, yet not too intense to introduce saturated pixels. A saturate pixel is the maximum value of the sensor (such as 255 for an 8-bit sensor, 255 = 2^8-1). When a pixel saturates, DIC can no longer perform sub-pixel interpolation at that pixel. 
+ The lighting should also avoid introducing too much heat. Halogen lamps are very bright but also very hot, while LEDs are cooler (but high-intensity LEDs can still generate a significant amount of heat). 
+ For maximizing optical DIC results, polarizing filters can be placed orthogonally on the lights and lenses (a photography trick called cross polarization). For DIC, cross polarization increases contrast, decreases error, and attenuates saturated pixels that prevent sub-pixel correlation (LePage, Daly, Shaw. [doi:10.1007/s11340-016-0129-2](https://doi.org/10.1007/s11340-016-0129-2)).
+ Lastly, using a fan to gently blow air over the DIC setup is pragmatic because the turbulent flow prevents heat waves from distorting the images (Reu, et al. "Distortion of full-field surface displacements from heat waves").

#### Best practices for cleaning cameras

1. The lenses and cameras must be cleaned to remove dust. Two easy ways to check for dust on DIC gear: 
	+ Shine a flashlight on the lens or sensor cover and move the flashlight around at different angles. Any specks of dust will be more visible.
	+ Point the camera at a uniform, diffuse, bright light (e.g. light panel with a diffuser) and increase the exposure just until the image is mostly saturated, then moving the camera and seeing and darker spots in the view that don’t move while you’re moving the camera.
1. Be especially careful while cleaning cameras, lenses, and sensors (only clean sensors with protective covers or panels), because improperly cleaning the gear can introduce permanent scratches. For a primer on cleaning photography gear, [B&H photo has a great guide](http://www.bhphotovideo.com/explora/photography/tips-and-solutions/how-clean-your-lens-and-filters). 
1. To remove dust, do not blow air at the lenses from an air can or from your mouth, which can introduce moisture on the lens that leaves a residue. Use a photography type duster instead. 
1. If the duster doesn’t get everything, then escalate to lens cleaning tissues. Only use new, clean lens cleaning tissues that have been moistened with lens cleaning solution.

#### Further reading
1. Reu, Phillip. "Stereo‐Rig Design: Creating the Stereo‐Rig Layout--Part 1." Experimental Techniques 36.5 (2012): 3-4. [doi:10.1111/j.1747-1567.2012.00871.x](http://doi.org/10.1111/j.1747-1567.2012.00871.x).
1. Reu, Phillip. "Stereo‐rig Design: Camera Selection---Part 2." Experimental Techniques 36.6 (2012): 3-4 []().
1. Reu, Phillip. "Stereo‐rig Design: Lens Selection--Part 3." Experimental Techniques 37.1 (2013): 1-3. [doi:10.1111/ext.12000](http://doi.org/10.1111/ext.12000).
1. Reu, Phillip. "Stereo‐rig Design: Lighting---Part 5." Experimental Techniques 37.3 (2013): 1-2. [doi:10.1111/ext.12020](http://doi.org/10.1111/ext.12020)


<a name="calibration"></a>
# 5. Calibration

For 2-D DIC, the only calibrat ion is a length scale conversion from the pixel space of DIC to the image's magnification, so the calibration needs a line of known length (such as the horizontal field width, or HFW). For 3-D DIC, the cameras must be calibrated with respect to one another in space, so a line is no longer sufficient. Thus, common calibration procedures involve a calibration grid, or a plane of known dimensions. This concept is illustrated below. The artificial speckle pattern and mock calibration grid were generated with the Speckle Generator and Target Generator softwares from Correlated Solutions, Inc.

<br /><br />![DIC calibrations]({{site.baseurl}}/assets/img/calibrations-01.png)<br /><br />

For the line length measurement to calibrate 2-D DIC, small errors in the line length can create large errors in the resulting displacements, so an accurate reference such as a precision ruler should be used.

For 3-D DIC, the calibration procedure varies among DIC software packages, but general best-practices are listed below. 

+ For an image horizontal field width (HFW) smaller than about 25 mm, a glass calibration grid with laser-etched marks is recommended due to the high precision at the small length scale. Printed grids on paper suffice for HFWs larger than about 25 mm. If using a printed grid on paper, then firmly affix the printed grid to a flat and rigid substrate, such as a section of PMMA sheet. 
+ To hold the grid, a dial indicator arm mounted on a two-axis stage with a magnetic base is fantastic. A lower-cost option with similar effect is a third-hand. 
+ For glass calibration grids, then backlight the grid either with a diffuse LED light panel or with indirect backlighting. One indirect backlit option is shining a light on a white poster board with a matte finish.
+ With the grid in the cameras et the light intensity to just before saturation to get good contrast.
+ Incrementally move and rotate the grid in the field of view, then take an image pair. 
+ Take 25-50 calibration images (more can produce even better results, but with diminishing returns).

#### Further reading
1. Reu, Phillip. "Calibration: stereo calibration." Experimental Techniques 38.1 (2014): 1-2. [doi:10.1111/ext.12048](http://doi.org/doi:10.1111/ext.12048).

<!--

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



 -->