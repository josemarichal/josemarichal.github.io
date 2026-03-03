import re

file_path = "C:/Users/jfmar/josemarichal/github.io/syllabus_ai_policy.html"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Increment week numbers 5 to 16 inclusive, going backwards to avoid double incrementing.
for i in range(16, 4, -1):
    text = text.replace(
        f'<div class="week-header">Week {i}:', f'<div class="week-header">Week {i+1}:')

# Now insert Week 5 before Unit 3
insertion_point = "<!-- Unit 3 -->"
new_week = """<div class="week-header">Week 5: Visualizing Problems with Open Data</div>
                    <div class="day-entry">
                        <span class="topic">Interactive Mapping & Public Awareness</span>
                        <p>Processing open government data to build interactive visualizations that localize national issues and drive agenda setting. Case Study: <em>Save Our Bridges</em>, an interactive map using Federal Highway Administration data to help citizens and businesses seamlessly locate structurally deficient and fracture-critical bridges in their zip codes.</p>
                        <ul class="readings-list">
                            <li><a href="http://www.saveourbridges.com" target="_blank">Interactive Map: Save Our Bridges (Barry B. LePatner)</a></li>
                        </ul>
                    </div>

                    """

text = text.replace(insertion_point, new_week + insertion_point)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)
print("Syllabus updated successfully.")
