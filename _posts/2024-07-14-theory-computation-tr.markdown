---
layout: post
title: "The Computational Dynamics of Tomb Raider"
subtitle: "PSPACE Complexity in Game Evolution"
date: 2024-07-15 16:46:02 -0500
categories: "self-care"
tags: [tech, programming, theory, cs, computer_science]
comments: true
---
I wrote this paper in college with a really good friend of mine. Shout out to that guy. Let me know if you want your name on this.

* * *

Tomb Raider, a late-90s video game featuring the iconic character Lara Croft, presents players with the adventurous pursuits of an athletic British archaeologist navigating treacherous environments with mortal health and breath. Having been reimagined and remastered a total of three times, the gameplay has always encompassed exploration, platforming, combat, and puzzle-solving. The game, when stripped of its exploration and combat, can be articulated as gadgets, described by Jayson Lynch\[1\], leading to the classification of Tomb Raider as PSPACE-complete.<!-- more -->

Introduction
============

The evolution of the Tomb Raider game series, spanning three distinct iterations, reflects technological advancements and shifts in the video game industry. Each rendition, shaped by its unique constraints and temporal context, offers players a different experience. The initial two versions emphasized puzzle-solving within environmental constraints, while the 2013 reboot introduced a survival gameplay mechanic and a heightened focus on third-person shooting, departing from the original emphasis on puzzles.

In examining the computational complexity of Tomb Raider within the context of Lynch's motion planning theory, it becomes evident that only the first two versions of the game series officially qualify as PSPACE-complete. The rationale behind this distinction lies in the absence of intricate puzzle-solving mechanics in the latest iteration. Lynch's theory underscores the significance of puzzles in motion planning complexity, aligning with the characteristics of the earlier versions of the Tomb Raider series.

The original Tomb Raider, released by CORE Designs in 1996 for PC, PlayStation 1, and Sega Saturn, set the stage for Lara Croft's iconic adventures. Crystal Dynamics continued the legacy with the second reboot, Tomb Raider: Legend, in 2006, spanning platforms such as PlayStation 2, Xbox, and PCs. Both versions of the game are polygon-based, owing to their 3D nature and utilization of polygon meshes. Lara's movement capabilities extend along three axes (within the constraints of the physics engine) and allow her to interact with various in-game objects, including levers, buttons, and boxes.

In the following sections, we explore the implementation of a non-crossing toggle for Tomb Raider: Legend and a non-crossing wire-lock for the original Tomb Raider. This exploration aims to demonstrate the PSPACE completeness inherent in these puzzles, offering insights within the broader realm of computational complexity and game development. While both games are driven by complex graphics, their gameplay, encompassing level data and Lara's movements, remains polygon-based. This enables the encoding of the game's current state in polynomial space with respect to the input size, representing the number of polygons that can be included in the environment. Despite differing control schemes, both games require a basic set of moves on a grid for Lara's interaction within the 3D environment.

The primary objective of these puzzles is to guide Lara to the exit. However, navigating through these challenges is not without peril. The game introduces hazards that pose a threat to Lara's health. Should her health be depleted, reaching zero, the consequence is swift and absolute – the game concludes, and Lara respawns in her initial position. To safeguard against undesirable moves that could potentially disrupt the intricate gadgets described in the ensuing sections, any mechanism inflicting damage proves fatal, abruptly terminating the game. Notably, there are also no shootable enemies, thereby eliminating the combat aspect from the game equation. Additionally, Lara's grapple lacks attachment points in the levels. As a result of these guarantees, she is unable to induce any side effects on the level, emphasizing the strategic focus on puzzle-solving.

Differences & Similarities of Game Development in the Mid-90s and Mid-2000s
===========================================================================

The Beginning of 3D Environments
--------------------------------

The original Tomb Raider was one of the first popular games to feature a completely 3D-generated model in a 3D-generated world. Due to the processing constraints of the Sega Saturn (for which the game was originally created), a very specific feature was used to enable the creation of the huge 3D environments– all of the levels were created on a [grid system](https://www.pcgamer.com/the-history-of-tomb-raider/). This virtual world was constructed using basic geometric shapes or "blocks", that formed the fundamental building units for creating environments and structures within the game, and Lara’s movements were all constrained to specific block counts: Lara could vertically jump and reach a ledge exactly one block above her, horizontally jump two blocks, and with a running start, could jump three blocks.

Due to the limitations of hardware and graphics technology in the mid-'90s, creating seamless and highly detailed environments was challenging, so repeating texture patterns were often used to cover large surfaces and create the illusion of detail without requiring excessive computational resources. As players became familiar with the game and its visual style, they developed an intuition for recognizing patterns and understanding the limitations of the graphical technology. Developing a sense of how the visual elements were constructed and how the player could interact with them shaped the decision-making involved in playing the game, demonstrating the intricate interplay between the player's understanding of the game's visual limitations and the strategic choices made during gameplay.

This interplay, within the constraints of a grid system, led to a decision space in which players navigated the virtual world. However, by 2006, advancements in GPUs allowed for higher-resolution textures, eliminating the focus on the grid system and expanding the decision space. This shift marked a significant increase in the number of possible choices available to players within the game's environment, reflecting the expanding complexity of decision spaces in the computational domain of PSPACE.

Increased Fidelity, Control, and Cinematic Quality of the Sixth Generation
--------------------------------------------------------------------------

As machines gained more and more processing power, the evolution of gaming systems became evident in the 2006 Tomb Raider reboot. The increased processing power allowed for the generation of more polygons at any given point, which was pivotal in creating a more dynamic and immersive gaming experience, as it facilitated the implementation of new and intricate movements, diverse player positions, and the introduction of new kinds of objects with properties never seen before in the series.

Because of the greater hardware support for additional objects with greater complexity being present in a given environment simultaneously, Crystal Dynamics took greater advantage of object interactivity, including things like spinning blades, flying arrows, and movable boxes, especially in interactions with each other.

One completely novel feature was Lara’s use of the grapple. Lara could now use a grapple to grab hold of objects to move herself towards the object or the object towards herself. For this new mechanic, algorithms determining the physics, collision detection, and animation of the grapple like those involved in realistic grapple movements would contribute to the time complexity. This addition was made possible by advancements in processing capabilities, exemplifying the expanding potential for interactive gameplay elements. The grapple introduced a new dimension to traversal and exploration, showcasing the growing complexity of gameplay mechanics achievable with improved computational resources.

Furthermore, the style of controllers has also changed between the time of Core and Crystal Dynamics with the addition of joysticks on the Playstation 2 controller. This meant a different control scheme for Lara’s movement in-game was introduced which took advantage of this new kind of analog input, which allowed for more precise control over character movements and camera angles compared to traditional directional pads. Players could make nuanced movement decisions, affecting traversal, exploration, and combat strategies. The introduction of joysticks, influencing player movement and camera control, potentially increased the number of states that needed to be considered within the game's computational space, again increasing PSPACE complexity. This adaptation influenced the design of decision points in games, providing players with more diverse and context-sensitive options. The increased dimensionality of input expanded the possibilities for player actions, contributing to a more nuanced and responsive gaming experience.

Note that increased fidelity and immersive gaming experience made games more cinematic than before; inspired by this, Quick Time Events were introduced in pursuit of a more immersive gameplay experience. QTEs (Quick Time Events) are interactive sequences in video games where players must follow on-screen prompts or press specific buttons within a limited time frame to execute actions or respond to events. The incorporation of QTEs enhances the cinematic quality of the game, making players feel like they are actively participating in the unfolding story. However, in the context of proving TR’s PSPACE-completeness, these QTEs have no decision-making influence relating to coming up with a solution to the game’s puzzles, and will therefore not be used in the context of the puzzles described in the following sections.

* * *

Tomb Raider: Legend (2006)
==========================

Non-crossing Toggle Lock
------------------------

This gadget implements a non-crossing toggle lock using game elements from the [Ghana](https://youtu.be/CG-xGB2OY10?t=195) level of Tomb Raider: Legend. Below is the top-down view of the gadget. We will first explain the specifics of each tunnel and then demonstrate the gadget.

![](https://docs.google.com/drawings/d/s8uc-dMXLc4SaUZsBE7hRXQ/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=91eDbMTt7Yog5Q&h=398&w=497&ac=1#rounded-white-bkg)

### Tunnel #1: Toggle

The primary features of tunnel #1 are a movable box, a corridor filled with swinging blades, and spikes. Its locations are A and B. Lara can enter either location from the planar overworld through a thin cutout in the wall. The opening is narrow enough that only Lara can fit through, i.e. no blocks can be brought through. These cutouts are located on the floor of the tunnel so Lara can enter and exit through them freely.![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfb2qBqXsBxFfMsA-uvbCZWrctfej8dSSlf8-kO8BXiN1nFLRKZTdURHHoAckgq3Q_bVaYn9zBpf2dKImB61He9Y3Y5KohFMJmY-Qm61LcPRnxxOGMKvsfvcCLrlex1Xp42HiUiq7LwzXHUZX0W?key=gsd_dwRg7Ob3d3qc7sHmeA#rounded-white-bkg)

In the middle corridor, there is a pair of large spinning blades, both emanating from the sides of the tunnel. There is a track on each side of the tunnel where the pair of blades are placed into the wall. The blades are spinning and move back and forth in the tunnel. [\[1\]](#ftnt1) This allows the blades to be moveable, something that will come in handy later. The blades are spinning fast enough, occupy a wide stretch of the tunnel, and are located such that Lara can neither jump over the blades, crouch under them, or walk through them without taking damage and dying. In our level, the blades are lethal so any contact will kill Lara. ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfb2qBqXsBxFfMsA-uvbCZWrctfej8dSSlf8-kO8BXiN1nFLRKZTdURHHoAckgq3Q_bVaYn9zBpf2dKImB61He9Y3Y5KohFMJmY-Qm61LcPRnxxOGMKvsfvcCLrlex1Xp42HiUiq7LwzXHUZX0W?key=gsd_dwRg7Ob3d3qc7sHmeA#rounded-white-bkg)

The next feature is a moveable block which can only be pushed from behind. In state 1, a block is placed on the side of location A. The only way Lara Croft can traverse through the rotating blades is by pushing this block in front of her as she goes through the middle of the tunnel. By placing the block in front of her, Lara effectively uses the block as a shield because it catches the blades and keeps them from rotating. Because each blade is placed on a track, once they are stuck on the box, they can be pushed forward as Lara pushes the block toward location B, as demonstrated [here](https://youtube.com/clip/UgkxleRUMdtkTjiPcyetoalO8hjXBYV6ENzX). The blades in this game level operate just like those in the clip. However, in this game level, remember that there are sufficiently many of them that Lara can only pass through the middle part by pushing the box through all the blades, i.e. she cannot time it well enough to pass through. Another modification to the direction the blades rotate is necessary but we will explain that later.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcIS8b92CIo43klNW9sdU7rZ7Dz4r2VuYUtW3fKhF_XX8RtoWU5KFVrE4DDVQSEbf4z14BBejJ8On_37qt3RnIgEvzQuQrJIrQxRAVImYoOHylI6GGCkSB88h-mmUoQeSohaFjvi1ih2aipgRp9fQ?key=gsd_dwRg7Ob3d3qc7sHmeA#rounded-white-bkg)

Another element of the Ghana level are spikes and this will be the last main primary feature of tunnel #1. On the side of location B, there are 3 sets of spikes located on the right side of the tunnel similar to those pictured below. [\[2\]](#ftnt2) However, the spikes in our game level will be modified. For one, the spikes will be much wider than the ones pictured above. Instead of spikes smashing into each other in the middle of the tunnel, there will only be spikes on the right side of the tunnel #1. They will move back and forth rapidly and be wide enough such that Lara cannot pass through without taking damage and being pushed off the tunnel and into the abyss. In other words, the spikes are too wide for Lara to jump past and move too quickly for her to time a successful pass. The last modification is that the spikes in this game level will be long enough to reach tunnel #2. The significance will be explained later.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc-iw28DBfSyujT_8sVEg8pkKGL-0QJqdZp47DhzQgFnvRRnde7TFlslMEeH9tlrO_tlUWu8zrK6PfGsz8qBor10_I5aDDfabRgUUaNeOT9qTnVTL4Iwu4SOXdJxJ9P9Zox3H8hGKUKWJntgQ0iVw?key=gsd_dwRg7Ob3d3qc7sHmeA#rounded-white-bkg)

Between the rotating blades and the spikes, there is a pressure plate. When pressure is applied, the spikes return to their starting position within the wall and stop moving. When pressure is released, the spikes immediately begin moving before Lara can run past them. So, to pass through the spikes and reach location B, Lara must put the block onto the pressure plate and leave it there. This will stop the spikes and allow her to pass to location B. Remember, she cannot take the box with her or remove it and still traverse past the spikes because the spikes immediately restart once the pressure plate is released. Once Lara has walked past the spikes, she has successfully completed the A → B traversal.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe7zJjVTGs-IE5Q-nmBh-bFi7ROEchro0-C4JzHMkiilihAgCkZhbrDHT6aD4c2x7xEDvP0b07zp5aQA0lV9qDGPYOWqJxrgnQ4XM1laDkpqBQHTKGytemDlsZoEH3tN2gDRSr7ZzntRTly5PVF?key=gsd_dwRg7Ob3d3qc7sHmeA#rounded-white-bkg)

Upon an A→B traversal, the tunnel is now only traversable from B → A. This is because in order to make it past the blades, you need to push the box as a shield. With the box located on the ‘B’ side, you can only traverse from B → A. In essence, whichever side the block is located on determines the traversability of the tunnel. One modification to how the blades are is necessary to ensure that it is traversable from whichever side the block is located on. From the video, you can see that the blades are rotating as they move back and forth. This also happens in our version with a single pair of large blades. However, once the blades hit one side of the track, they will change the direction of their rotation such that a player pushing a block in the opposite direction the blades are moving will be able to catch the blades. In other words, in order for the block to catch the blades, they need to hit the block from the front. The blades need to rotate towards the box. If the blades are rotating in the same direction as the box is being pushed, then the blades will cut Lara from behind. To fix this, the pair of blades will change the direction of their rotation once they hit either end of the track. When the blades move towards side A, they will be rotating in the same direction. When they mode towards side B, they will also rotate towards B. This ensures that whichever side the box is on, the player is able to make a proper traversal to the other side using the box. This is a small but necessary modification. By making sure the direction of rotation switches, we ensure that only the location of the box determines the traversability of the tunnel.

### Tunnel #2: Lock

Tunnel #2 is a lock. When it is open, it is traversable in both directions. Otherwise, it is not traversable in any direction. Remember that the spikes emanating from tunnel #1 reach the full width of tunnel #2. So, when the spikes are in motion, tunnel #2 is blocked, i.e. no traversal is possible from C → D or D → C. This is because, as discussed before, the 3 sets of spikes occupy a long enough part of the tunnel, each spike is thick enough, and all spikes are moving rapidly such that Lara cannot pass across the tunnel without being hit by a spike and pushed off the tunnel and dying.

### Operating the Gadget: Non-crossing toggle lock

![](https://docs.google.com/drawings/d/s43dFdTINPn0yd3kbMBdxPw/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=a85HGkjO8W4RIQ&h=224&w=249&ac=1#rounded-white-bkg) ![](https://docs.google.com/drawings/d/sJM9Pnf-3z7ADgXAAJfkK2Q/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=4VudEAHNLo3GmQ&h=231&w=260&ac=1#rounded-white-bkg)

There are two states to this gadget. In state #1, tunnel #1 is only travserable from A → B and tunnel #2 is untraversable. This is because the spikes prevent any traversal between C and D and if Lara entered from B, she couldn’t move past the moving spikes. The only possible traversal is from A → B. To accomplish this, Lara must first push the box through the blades for protection. Then, Lara must place the box on the pressure plate to put the spikes into their starting position. This allows Lara to progress to B and unlocks tunnel #2 because the spikes are no longer moving. In state #2, tunnel #1 is only traversable from B → A since the box is no longer located on the ‘A’ side. Tunnel #2 is traversable in both directions. If Lara entered from B in state #2, then she could walk past the spikes since they aren’t moving. She would then have to push the box off the pressure plate and use it as a shield to get through the spinning blades. Remember that as soon as the plate is released, the spikes begin to move rapidly so Lara cannot remove the box and return to B. Using the box as a shield, Lara can reach A and the traversability has switched again because the box is on the ‘A’ side and the spikes are active. By taking the box off the pressure plate, tunnel #2 is now locked. Thus, the gadget is a non-crossing toggle lock because traversing tunnel #1 changes its traversability and results in tunnel #2 becoming locked/unlocked. As shown, the gadget is reversible since undoing a traversal returns the gadget to its original state. The mechanisms in this level only interact within the two tunnels and can only be affected via the moves described above. So, the gadget is also deterministic and independent. The overall goal of Tomb Raider is to reach the end goal so we assume Lara is playing optimally, i.e. not wandering around in the middle between the spikes and blades. Also, the tunnels are placed far enough from each other that Lara cannot jump from one to the other falling into the abyss. And so, by the 2-tunnel theorem, our game level for Tomb Raider: Legend is PSPACE-hard.

We can show that our level of Tomb Raider is in PSPACE by using a nondeterministic guessing algorithm. In addition to the possible guesses of moving forward, backward, left, and right, we will add the possible guesses of attempt to push a block forward and attempt to release a block. We use the word ‘attempt’ because there may not be a box for Lara to move. These six guesses cover all the possible actions Lara can take in the game. To encode our game level, we need to be a little clever because the different mechanisms, i.e. the rotating blades and moving spikes, don’t have an obvious encoding. However, when these mechanisms are in operation, it basically means that Lara can’t be on those grind cells. So, we can simply encode whether a grid cell is occupied or unoccupied and be agnostic to the specifics as to why a particular cell is occupied. If we let n be the number of grid cells in our game level, then we can encode the status of each cell and store the game-level data in polynomial space. Now, we can use a state counter to nondeterministically guess a move for Lara to make, check if Lara has reached the end, and stop once we start repeating states. This puts our Tomb Raider level in NPSPACE but by Savitch's theorem, PSPACE = NPSPACE. Since our game level is both in PSPACE and PSPACE-hard, it is PSPACE-complete.

* * *

Tomb Raider I (1996)
====================

Tripwire
--------

### Tunnel: Lever Say Lever

The following explains how a tripwire tunnel can be constructed using [doors](https://www.wikiraider.com/index.php/Doors) and [levers](https://www.wikiraider.com/index.php/Trigger#Levers), which are heavily featured in the game, focusing on the use of [timed doors](https://www.wikiraider.com/index.php/Timed_Door).

Two rooms/endpoints (A and B) are connected by a tunnel. In each room, there is a lever (let it be called a in A and called b in B) that starts in a False state, and there is a closed door (let the door in A be called x and the door in B be called y) that leads to the corridor between A and B. Setting lever a to True opens x for exactly enough time such that Lara can only run into the corridor and cannot return to A; setting lever b to True does the same for y and room B.

In the corridor, there is a button c, which, if pressed, will open door y if lever a is also set to True, and will open door x if lever b is also set to True. When either door is successfully opened using button c, then levers a and b are reset to False, and Lara can run into the non-origin room, completing the traversal. The door will only be open for enough time for Lara to enter the room but not return to the corridor. To go back to the original room after a traversal, Lara will have to set the lever in the endpoint room to True to open the closest door. Then, she’d have to hit the button c to open the door she first passed through and return to the starting room. Remember, we are assuming Lara is playing optimally to reach the end goal and will not make any moves that will permanently lock in the tunnel. So, Lara would not hit button c to open either x and y and then simply choose to stay in the middle corridor because it would permanently keep her stuck there since the outer levers will be set to False as a result of hitting the button. Also, the doors are timed in such a way that if Lara chooses to pass over them, either from one of the outer rooms into the corridor or vice versa, she would only have enough time to just get past the door and not return to the room she started from. And while she could move around one of the outer rooms and not pass through the door, this wouldn’t make Lara better off as it doesn’t get her closer to the end.

The levers a and b cannot ever both be set to True at the same time because then Lara would have to be able to traverse the tunnel without having either A or B be set to False. This is impossible because crossing from one room to the other requires the original lever used to exit the first room to be set to False. If Lara spawns in room J (where J is either A or B), then j (where j is the lever of room J) must be reset to False once the door to J’ (where if J is A, then J’ is B, and if J is B, then J’ is A) is opened, which is necessary to set j’ to True. Therefore, both levers can never be set to True at the same time.

Another issue that may arise with the tripwire is Laura switching the lever in her origin room, running into the corridor, pulling another lever (switching the state of the lock), and then being able to run back into the origin room before the timer runs out and the door closes. This can be alleviated using timed doors that all explicitly abide by the Indy Hat Property, explained below:

[Indy Hat](https://www.youtube.com/watch?v=2ui85HwTX1s) Property [\[3\]](#ftnt3)

Timed doors that abide by this property force Lara to either stay in her current room or move into the room that the doorway had just opened. These doors are positioned/timed in such a way that Lara cannot return to the original room she exited via the door before it shuts. If the doorway is too far and/or there isn’t enough time, she could never make it through, and if it is too close, she could step into the other room and then return to the original room. The exact timing/distance would require placing the door at a location with a timer such that when running full speed using the shortest path from the switch/button to and through the doorway that was just opened would mean it shuts exactly behind Lara as she enters the room, preventing her from returning.

By having all of the doors included in the tunnel abide by this property in respect to the button/lever that are directly adjacent to it, one of which must be c, then all of the doors begin to function as one-way doors, and in the context of the tunnel, force the player to complete the traversal before being able to return to the original starting point.

Top Down View

![](https://docs.google.com/drawings/d/scUCtGlzwlOOrkjaTgSivIQ/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=xPrdD0WGIbM1dA&h=290&w=472&ac=1#rounded-white-bkg)

* * *

Locks
-----

In Level 8: The Cistern [\[4\]](#ftnt4) of the original 1996 Tomb Raider game, adjusting the water level of a room is used to facilitate Lara reaching different parts of the room that she cannot reach in a given state: whether it be due to the area not being within platforming reach or due to the area being underwater and too far away for Lara to reach without running out of breath. Another example of this being used specifically in Tomb Raider can be seen in Level 5: Saint Francis’ Folly. [\[5\]](#ftnt5) This feature inspired the creation of two kinds of locks in this paper.

### Tunnel: Water Level Lock I

The following explains how a locking tunnel can be constructed exploiting Tomb Raider’s [fall damage](https://www.tombraiderforums.com/showthread.php?t=225255), which can be completely circumvented by having Lara fall into a body of water.

There are two small rooms (A and B), which are the endpoints of a single tunnel. Each of these rooms contains a hole in the floor which drops down to a tunnel filled with water, leading to the other room. This tunnel has an elevation high enough such that if the tunnel is not filled with water, Lara will hit the ground and not survive the fall. If the tunnel is filled with water, then Lara will drop gracefully into the hole without hitting the ground and then swim across the tunnel and can come out of the other side. This tunnel is therefore unlocked when it is filled with water, and locked when it is empty. Because Lara can hold her breath for long enough to swim through the tunnel, the tunnel is traversable and can be traversed an infinite number of times as long as she has enough air to do so. If Lara spawns on either side when there is no water in the tunnel, she will be unable to reach either endpoint due to the ledges for the holes which allow her to enter a given room being too high off the ground for her to reach, so she will be unable to progress.

Profile View

![](https://docs.google.com/drawings/d/sYl683fZmCdtZL_7qmlasmw/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=cox_Ek6_G88t6A&h=241&w=358&ac=1#rounded-white-bkg)

### Tunnel: Water Level Lock II

The following explains how a locking tunnel can be constructed by exploiting Tomb Raider’s [Oxygen Bar](https://www.wikiraider.com/index.php/Breath_Bar), which limits the amount of time Lara can spend underwater.

There are two small rooms (A and B), which are the endpoints of a single tunnel. Each of these rooms contains a hole in the floor which drops down to a tunnel filled with water, leading to the other room. The key difference with this corridor is that it is too long for Lara to swim. She doesn’t have enough oxygen to allow her to swim the distance between A and B, even if the shortest possible path is taken. This makes it such that when the tunnel is filled with water, it is not traversable and therefore locked. In the tunnel, beneath the hole leading to A and B, respectively, there is a platform that Lara can jump onto without taking any damage from the hole in a given room. If she is standing on a platform, then she can jump and grab onto the edge of the hole leading to A or B, depending on which of the two platforms she is standing on. To traverse the tunnel when it is in an unlocked state, she would drop down through the hole of a given room, land safely on the platform, get down from the platform, walk through the tunnel, and then climb onto the other platform, jump and grab onto the edge of the corresponding hole, and then climb up. Because the platforms are stationary and Lara has infinite energy, she can traverse the tunnel an infinite number of times in the case that the tunnel is unlocked.

Profile View

![](https://docs.google.com/drawings/d/sVWMlds2gMxR4Pby4jxZ6Wg/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=aQTm1Ywjx9MP6g&h=224&w=430&ac=1#rounded-white-bkg)

Creating a Non-Crossing Wire Lock
---------------------------------

The Lever Say Lever tripwire can be used with one of the described locks in order to create a Non-Crossing Wire Lock (NWL). The button c in the Lever Say Lever tripwire can still retain its original functionality with the addition of locking or unlocking one of the lock tunnels: every time button c is pressed and either a or b is also set to True, the state of the lock switches. In the case of Water Level Lock I, unlocking the tunnel involves opening a pipe that fills the corridor to the brim with water, while locking it would involve a drain opening in the floor of the corridor and then leaving; for Water Level Lock II, it would be the opposite. If neither a or b is set to True, then hitting the button will not change the status of the lock, preventing the player from sitting in the corridor and just constantly hitting c; this move is furthermore not optimal because hitting the button and not going through a doorway will result in Lara being stuck in the corridor, so in the case of our guessing algorithm would not be played.

Putting either of the water locks with the tripwire creates a non-crossing wire lock. The water locks are only traversable when unlocked and the tripwire is traversable in either direction. In order to traverse the tripwire, Lara is forced to hit the button c, allowing her to pass through the next door while also changing the state of the water lock. When the water lock is unlocked, any traversal can be reversed by simply going back the way you came. Likewise, any traversal in the tripwire tunnel can also be reversed by operating the levers in reverse. Undoing a traversal will return the state of the gadget to what it was beforehand. The levers in the tripwires can only be operated as described and are only connected to the doors and tunnels within the gadget. So, the gadget is deterministic and independent. Thus, the gadget is a NWL satisfying theorem 3 and proves PSPACE-hardness.

We can also show that this level is in PSPACE. Similar to Tomb Raider: Legend, we can be agnostic as to what exactly is occupying a cell of the game level, i.e. water or a closed door, and just encode whether Lara can occupy that cell or not, whether it be standing, climbing, or floating above. Instead, we will just encode for each cell of the game level whether it can be occupied by Lara or not. So, we can store each game level in polynomial size with respect to the input size n, where n is the number of grid cells. Remember that we are restricting our game level to be grid-based so the only possible moves for Lara are to attempt to move forward, backward, left, right, push a lever, push a button, jump forward, and grab. So, we can use a state counter to nondeterministically guess one of these moves for Lara to make, check if Lara has reached the end, and stop once we start repeating states. This puts our Tomb Raider level in NPSPACE but by Savitch's theorem, PSPACE = NPSPACE. Since our game level is both in PSPACE and PSPACE-hard, it is PSPACE-complete.

* * *

Conclusion
==========

The evolution of the Tomb Raider series highlights a paradoxical trend: despite the escalating PSPACE complexity driven by technological advancements, the puzzles presented to players in the most recent iterations of the game have become increasingly simplistic. This trend became particularly evident with the release of the 2013 reimagining of Tomb Raider by Square Enix. Critics widely noted that this version departed from the original spirit of the series, which was renowned for its intricate and challenging puzzles. Instead, the 2013 release featured puzzles of a more straightforward, almost childlike nature, diverging from Lara's signature platforming challenges.

The simplification of puzzles in modern Tomb Raider games can be attributed to the strategic decisions of game developers aiming to broaden the appeal of the series to a wider audience. By simplifying puzzles, the developers made the game more accessible to newcomers and casual gamers, potentially increasing the franchise's market reach. This move reflects a broader trend in the gaming industry, where large corporations seek to maximize their audience base to ensure higher sales and profitability.

Another significant factor driving the trend toward simpler puzzles is the emphasis on storytelling and maintaining a dynamic pace in contemporary games. Modern players often prioritize immersive narratives and seamless gameplay experiences. Simplified puzzles facilitate a smoother narrative flow, preventing interruptions that could detract from the game's momentum. This approach aligns with the preferences of today's gaming audience, who may favor action and exploration over the cerebral challenge of complex puzzle-solving.

Furthermore, the evolving trends in the gaming industry and shifts in player preferences have influenced the design choices in the Tomb Raider series. Market research likely indicated a growing demand for streamlined gameplay experiences that emphasize other aspects, such as action and exploration. In response, developers adjusted the puzzle complexity to cater to these preferences, ensuring that the game remained engaging and appealing to a broad spectrum of players.

The demand for more sophisticated graphics, expansive environments, and intricate game mechanics has also played a crucial role in the simplification of puzzles. Developing high-quality visuals and immersive worlds requires substantial resources and extended development timelines. In the face of these demands, developers may have strategically chosen to simplify puzzles to allocate resources more efficiently and meet production deadlines. This decision reflects the pressures of crunch culture, where developers are often pushed to work long hours to deliver games on time and within budget constraints.

In conclusion, the evolution of the Tomb Raider series illustrates the complex interplay between technological advancements, market forces, and industry practices. While the increasing PSPACE complexity in the game's mechanics showcases the potential for intricate gameplay, the trend toward simpler puzzles underscores the influence of large corporations and the realities of game development. The decisions made by developers, driven by the need to appeal to a broad audience, maintain narrative flow, and manage resource constraints, highlight the multifaceted nature of modern game design. As the gaming industry continues to evolve, the balance between complexity and accessibility will remain a key consideration, shaping the future of beloved franchises like Tomb Raider.

* * *

References
==========

E. D. Demaine, D. H. Hendrickson, and J. Lynch, “Toward a General Complexity Theory of Motion Planning: Characterizing Which Gadgets Make Games Hard,” 2020. doi: 10.4230/LIPICS.ITCS.2020.62

* * *

Other Additional In-Game Mechanisms that Could Warrant Further Exploration
==========================================================================

[Tomb Raider (1996)](https://www.youtube.com/watch?v=H8MHP1zBv_8)

1.  Door lock (0:54)
2.  Crumbling floor (2:14)
3.  Movable block (3:20)
4.  Only being able to return through elevated entrance (4:00)
5.  Lever that drops you down to the floor below (5:56)
6.  Bridge (9:02)
7.  Box on pressure pad (15:24)
8.  Swim through water-filled level to reach lever to remove water (16:33-16:51) [\[6\]](#ftnt6)
9.  Swords falling from ceiling locks door behind Lara due to pressure plate at door (18:01)
10.  Able to swim up a distance that Lara could never jump (19:06)
11.  Levers that you can only pull when the level is underwater (43:23)
12.  Swinging blade (44:52)
13.  Pulling lever raises further platforms (46:06)
14.  Only instance of moving liquids on-screen in the form of flooding lava (1:30:50)
15.  Bolder (1:31:00)

* * *
