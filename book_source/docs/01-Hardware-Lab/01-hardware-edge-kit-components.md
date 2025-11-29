# Chapter 1: Building Your Physical AI Lab - The Physical AI Edge Kit

This section describes the "Physical AI" Edge Kit, which allows you to build the "nervous system" of a robot on your desk without the significant expense of a full-scale humanoid. You'll use this kit to deploy and test your AI models in a physical, resource-constrained environment, mirroring real-world robotics development.

## 2. The "Physical AI" Edge Kit: Bringing AI to the Real World

**Economy Jetson Student Kit (Approx. ~$700)**

### The Brain: NVIDIA Jetson Orin Nano Super Dev Kit (8GB)

*   **Role:** This is the industry standard for embodied AI. You will deploy your ROS 2 nodes and AI inference stack here, learning to optimize for real-world resource constraints compared to your powerful workstation. This hands-on experience is crucial for understanding the challenges of deploying AI to edge devices. (Approx. $249 - Capable of 40 TOPS)

### The Eyes: Intel RealSense D435i

*   **Role:** Provides essential RGB (Color) and Depth (Distance) data, critical for Visual SLAM (Simultaneous Localization and Mapping) and perception modules. The `i` in D435i indicates it includes a built-in IMU (Inertial Measurement Unit), which is vital for robust localization and mapping. (Approx. $349)

### The Ears: ReSpeaker USB Mic Array v2.0

*   **Role:** A far-field microphone array crucial for integrating voice commands and "Voice-to-Action" features using models like Whisper (as explored in Module 4 of the course). This enables natural language interaction with your robot. (Approx. $69)

### Wi-Fi Module

*   **Role:** Conveniently included in the Jetson Orin Nano Super Dev Kit, providing wireless connectivity for your edge device.

### Power & Miscellaneous Components

*   **Required:** A high-endurance 128GB MicroSD card (essential for the operating system and data storage) and jumper wires for various connections. (Approx. $30)

### Project Idea: Simple Sensor Data Collection

As a first project with your Edge Kit, you can set up basic sensor data collection:

1.  **Jetson Setup:** Follow the NVIDIA documentation to flash Ubuntu onto your Jetson Orin Nano and install necessary drivers for the RealSense camera.
2.  **RealSense Integration:** Write a simple Python script (or use an existing ROS 2 package) to stream RGB and depth data from the Intel RealSense D435i.
3.  **Microphone Test:** Use a basic audio recording tool (e.g., `arecord` on Linux) to confirm your ReSpeaker USB Mic Array is recognized and capturing audio.
4.  **Data Logging:** Extend your script to log a few seconds of camera data and audio, verifying that all components are functioning correctly. This foundational step ensures your hardware is ready for more complex AI and robotics tasks.