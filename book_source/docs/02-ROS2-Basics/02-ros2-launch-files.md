# Chapter 2: ROS 2 Fundamentals - Launch Files for System Orchestration

As your robotic system grows in complexity, managing multiple nodes with specific configurations can become challenging. This section introduces **Launch files**, a powerful feature in ROS 2 that automates the orchestration of your robot system, ensuring consistency and efficiency in development and deployment.

## 4. Launch Files: Orchestrating Your Robot System

Launch files are scripts (often written in Python or XML) that allow you to define and manage how multiple ROS 2 nodes are started and configured. They are indispensable for any non-trivial robot application.

### Key Capabilities of ROS 2 Launch Files:

*   **Start multiple nodes simultaneously:** Instead of manually running `ros2 run` for each node, a single launch file can bring up an entire subsystem (e.g., all nodes for navigation, perception, or manipulation).
*   **Configure node parameters:** Pass arguments and parameters to your nodes at startup. This allows you to easily adjust node behavior (e.g., sensor calibration values, control gains) without modifying the node's source code.
*   **Remap topic/service names:** Change the names of topics or services used by nodes. This is useful for avoiding naming conflicts, integrating different components, or debugging.
*   **Include other launch files:** Promote modularity by breaking down large launch configurations into smaller, reusable files. You can then include these sub-launch files into a main launch file.
*   **Conditional execution:** Run nodes or actions only if certain conditions are met (e.g., only launch a camera driver if a physical camera is detected).

Launch files automate the process of bringing up a complex ROS 2 system, ensuring consistency and making development and deployment much more efficient. For example, a single launch file could start all the nodes required for a robot's navigation stack: a LiDAR driver, a mapping algorithm, a path planner, and a motor controller.

### Example: Simple Python Launch File

Let's create a basic Python launch file that starts our `hello_publisher_node` and `hello_subscriber_node` from the previous section.

**File:** `src/my_robot_pkg/launch/hello_world_launch.py`

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_pkg',
            executable='hello_publisher',
            name='my_hello_publisher',
            output='screen',
            parameters=[
                {'message_prefix': 'Publisher says: '}
            ]
        ),
        Node(
            package='my_robot_pkg',
            executable='hello_subscriber',
            name='my_hello_subscriber',
            output='screen',
        )
    ])
```

To run this launch file: `ros2 launch my_robot_pkg hello_world_launch.py`

This will start both nodes, and you'll see their output in the terminal. Notice how parameters can be passed to the nodes (though our example nodes don't currently use `message_prefix`, it demonstrates the mechanism).

### Project: Orchestrating an Echo System with Launch Files

Building on the "Simple Echo Bot" project from the previous section, create a launch file that orchestrates all three nodes (`talker`, `listener`, `echo_bot`).

Your launch file should:

1.  Start the `talker` node.
2.  Start the `listener` node.
3.  Start the `echo_bot` node.
4.  Optionally, try to remap the `/chatter` topic for one of the nodes (e.g., remap `listener`'s subscription from `/chatter` to `/chatter_echo`) to demonstrate topic remapping.

This project will give you practical experience in managing complex ROS 2 applications using launch files, a critical skill for developing robust robot systems.
