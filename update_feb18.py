import re

with open('syllabus_tech_politics.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the Feb 18 section
old = '''                            <li><a href="https://www.swarthmore.edu/understanding-political-disconnect"
                                    target="_blank">Swarthmore Political Disconnect Study</a></li>
                            <li><a href="https://friendsofattention.org/" target="_blank">Friends of Attention</a></li>
                            <li><a href="http://dtdlab.virginia.edu/event/digital-democracy-from-below/"
                                    target="_blank">Extra Credit</a></li>'''

new = '''                            <li><a href="http://dtdlab.virginia.edu/event/digital-democracy-from-below/"
                                    target="_blank">Extra Credit</a></li>
                        </ul>
                        <p style="margin-top: 1rem; margin-bottom: 0.5rem; font-weight: bold; color: var(--accent-color);">Cases We'll Discuss in Class:</p>
                        <ul class="readings-list">
                            <li><a href="https://www.swarthmore.edu/understanding-political-disconnect"
                                    target="_blank">Swarthmore Political Disconnect Study</a></li>
                            <li><a href="https://friendsofattention.org/" target="_blank">Friends of Attention</a></li>'''

if old in content:
    content = content.replace(old, new)
    with open('syllabus_tech_politics.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated successfully')
else:
    print('Pattern not found')
