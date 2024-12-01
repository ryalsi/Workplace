import bpy

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Create a human-like base (a simple humanoid body shape using spheres and cylinders)
# Head (Sphere)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.5, location=(0, 0, 1.5))
head = bpy.context.active_object
head.name = "Head"

# Body (Cylinder)
bpy.ops.mesh.primitive_cylinder_add(radius=0.4, depth=1.5, location=(0, 0, 0.5))
body = bpy.context.active_object
body.name = "Body"

# Legs (Cylinders)
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1, location=(-0.2, 0, -0.5))
left_leg = bpy.context.active_object
left_leg.name = "Left Leg"

bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1, location=(0.2, 0, -0.5))
right_leg = bpy.context.active_object
right_leg.name = "Right Leg"

# Arms (Cylinders)
bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=1, location=(-0.6, 0, 1.0))
left_arm = bpy.context.active_object
left_arm.name = "Left Arm"

bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=1, location=(0.6, 0, 1.0))
right_arm = bpy.context.active_object
right_arm.name = "Right Arm"

# Optional: Scale and adjust proportions
body.scale = (0.5, 0.5, 1.5)
head.scale = (0.6, 0.6, 0.6)

# Set view to show the model
bpy.ops.view3d.view_all(center=False)
