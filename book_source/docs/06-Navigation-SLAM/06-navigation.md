# Chapter 6: Navigation & SLAM

### 1. Understanding Simultaneous Localization and Mapping (SLAM)

Simultaneous Localization and Mapping (SLAM) is a fundamental technique in robotics and autonomous systems that enables a vehicle to construct a map of an unknown environment while simultaneously determining its own location within that map. This capability is crucial for autonomous navigation, path planning, and interaction with the environment.

**Key Components of SLAM:**
SLAM typically involves two main components:
*   **Sensor Signal Processing (Front-end):** This component is sensor-dependent and handles the raw data from sensors like cameras (for Visual SLAM) or lidar (for Lidar SLAM). It extracts features or measurements from the environment.
*   **Pose-Graph Optimization (Back-end):** This component is sensor-agnostic and processes the relative pose estimates and observations from the front-end to create a consistent map and refine the vehicle's trajectory.

**Types of SLAM:**
*   **Visual SLAM (vSLAM):** Utilizes camera images, offering a cost-effective solution with rich information for landmark detection. It can be augmented with Inertial Measurement Units (IMUs) to address depth estimation challenges. Algorithms are broadly classified into Sparse methods (e.g., ORB-SLAM) and Dense methods (e.g., LSD-SLAM).
*   **Lidar SLAM:** Employs laser sensors for precise distance measurements, making it suitable for high-speed vehicles. It generates 2D or 3D point cloud data, and robot movement is estimated by registering these point clouds, often using algorithms like Iterative Closest Point (ICP). Fusion with wheel odometry, GNSS, and IMU data enhances localization accuracy.
*   **Multi-Sensor SLAM:** Integrates data from various sensors (cameras, IMUs, GPS, lidar, radar) to improve precision and robustness by leveraging their complementary strengths. Factor graphs are a common framework for integrating diverse sensor types.

**Challenges in SLAM:**
1.  **Accumulating Localization Errors:** Errors can accumulate over time, leading to distortions in the map and the "loop closure problem," where the robot returns to a previously visited location but fails to recognize it. Techniques like landmark recognition and pose graphs (e.g., bundle adjustment in vSLAM) help minimize these errors. Accurate sensor calibration is vital for multi-sensor setups.
2.  **Localization Failures:** Discontinuous position estimates can occur, leading to the robot getting lost. Recovery algorithms or sensor fusion (combining motion models with multiple sensors) can prevent this. Kalman and particle filters are commonly used, along with sensors like IMUs and wheel encoders. Keyframe landmarks aid recovery through feature extraction.
3.  **High Computational Cost:** Processing images, point clouds, and performing optimizations can be computationally intensive, especially on embedded hardware with limited resources. Countermeasures include parallel processing using multicore CPUs, SIMD, and GPUs, or scheduling pose graph optimization at lower priority.

### 2. Obstacle Avoidance with Intel RealSense Depth Camera

The Intel RealSense Depth Camera, particularly models like the D435 or D435i, can be effectively integrated with robotics platforms such as ArduPilot for autonomous obstacle avoidance. This allows robots to detect and react to obstacles in their environment, ensuring safer navigation.

**Hardware and Setup:**
*   **Camera:** Intel RealSense 435 or D435i depth camera.
*   **Companion Computer:** An UP Squared companion computer is recommended, as Raspberry Pi 4 is not directly supported for this specific integration.
*   **Mounting:** The camera should be mounted facing forward, ideally with vibration isolation, and connected via USB to a USB3 port on the companion computer.
*   **Serial Connection:** The UP Squared's serial port needs to be linked to an autopilot telemetry port (e.g., Telem1, Telem2).

**Software and Configuration (ArduPilot):**
1.  **APSync Installation:** Install APSync on the UP Squared by downloading and restoring the appropriate APSync image (e.g., `apsync-up2-d435i-yyyymmdd.tar.xz`) using a tool like Clonezilla via Tuxboot.
2.  **Firmware Update:** Ensure the RealSense camera firmware is updated to version 5.12.8.200 or later.
3.  **ArduPilot Parameter Settings:**
    *   `SERIALx_PROTOCOL = 2` (where `x` is the serial port number, typically 2 for Telem2) to enable MAVLink2.
    *   `SERIALx_BAUD = 921` (921600 baud) for the serial communication speed.
    *   `PRX1_TYPE = 2` to enable the proximity sensor.
    *   `AVOID_ENABLE = 7` to enable various avoidance behaviors.
    *   Tune `AVOID_MARGIN`, `AVOID_BEHAVE`, `AVOID_DIST_MAX`, and `AVOID_ANGLE_MAX` to define avoidance parameters.
    *   **Reboot** the autopilot after configuration.

**How it Works:**
The system typically uses a Python script running on the companion computer to process the raw depth images from the RealSense camera. This script applies filters to reduce noise and "black holes" in the depth data. It then processes the camera's horizontal field of view into 72 rays, compensating for vehicle pitch, and sends `OBSTACLE_DISTANCE` MAVLink messages to the autopilot at a rate of 10Hz or more. The autopilot then uses these messages to perform obstacle avoidance maneuvers.

**Verification:**
*   **Ground Test:** Use Mission Planner's "Mavlink Inspector" to confirm that `OBSTACLE_DISTANCE` messages are being received (around 15 Hz) and that the "Proximity view" accurately shows the distance to the nearest obstacle within 45-degree arcs.
*   **Flight Test:** In `AltHold` or `Loiter` mode, observe if the vehicle stops or slides at the configured distance when moving towards obstacles. DataFlash logs (`PRX.CAn` and `PRX.CDist`) can be analyzed to review the proximity data.

### 3. Guide to Setting Up the Nav2 Stack in ROS 2

The Nav2 stack in ROS 2 provides a powerful framework for robot navigation, including capabilities for localization, mapping, path planning, and motion control. This guide outlines the steps to set up Nav2 for a simulated Turtlebot3 robot.

**1. Install Nav2 and Turtlebot3 Packages:**
Begin by installing the necessary ROS 2 packages for Nav2 and Turtlebot3.
```bash
sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup
sudo apt install ros-humble-turtlebot3\*
```

**2. Set Robot Model:**
Configure the `TURTLEBOT3_MODEL` environment variable in your `.bashrc` file to specify the Turtlebot3 model being used (e.g., `waffle`).
```bash
export TURTLEBOT3_MODEL=waffle
```

**3. Launch Simulated Robot in Gazebo:**
Start a simulated Turtlebot3 robot in a Gazebo environment.
```bash
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
```

**4. Generate a Map using SLAM (Cartographer):**
To create a map of the environment, launch the Cartographer SLAM node, ensuring `use_sim_time:=True` for simulation.
```bash
ros2 launch turtlebot3_cartographer cartographer.launch.py use_sim_time:=True
```
Drive the robot around the environment using a teleoperation node (e.g., `ros2 run turtlebot3_teleop teleop_keyboard`). Once the map is sufficiently built, save it:
```bash
ros2 run nav2_map_server map_saver_cli -f my_map
```
This command will create two files: `my_map.yaml` (containing metadata like resolution and origin) and `my_map.pgm` (the occupancy grid image).

**5. Configure DDS and Turtlebot3 Navigation Parameters:**
*   **Install Cyclone DDS:** Cyclone DDS is often preferred for performance with Nav2.
    ```bash
    sudo apt install ros-humble-rmw-cyclonedds-cpp
    ```
*   **Set RMW Implementation:** Add the following line to your `.bashrc` to configure ROS 2 to use Cyclone DDS:
    ```bash
    export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
    ```
*   **Modify Turtlebot3 Navigation Parameters:** Edit the `waffle.yaml` file (typically found at `/opt/ros/humble/share/turtlebot3_navigation2/param/waffle.yaml`) to set the `robot_model_type`.
    ```yaml
    robot_model_type: "nav2_amcl::DifferentialMotionModel"
    ```

**6. Launch Nav2 for Navigation:**
With the map generated and configurations set, launch the Nav2 stack, specifying the path to your saved map.
```bash
ros2 launch turtlebot3_navigation2 navigation2.launch.py use_sim_time:=True map:=/path/to/my_map.yaml
```
In RViz, use the "2D Pose Estimate" tool to initialize the robot's position and orientation on the map. Then, use the "Nav2 Goal" tool to set navigation targets for the robot.