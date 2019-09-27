
## Audio Engineer's Toolbox

http://a4-davidvollum.glitch.me

The goal of this project was to build a web based graphical audio analyzer for audio engineers. It has a threshold, which is set 
with the textbox in the top right which freezes the waveform when it gets above the threshold. This allows the user to 
easily identify which frequency needs to be adjusted.  I really struggled with how to make the UI be usable and simple
and yet elegant. I fell that I mostly succeeded. I attempted to add the ability to click and drag the threshold line 
but I was unable to get it working in time. I used ESLint as my linter.


## Technical Achievements
- **Tech Achievement 1**: I learned how to get live audio from the users microphone with there consent
- **Tech Achievement 2**: My audiovisualizer uses both FFT and amplitude analysis to drive visualization.
- **Tech Achievement 3**: I scale the audiovisualizer based on the size of the window and actually label the regions with there frequency
- **Tech Achievement 4**: My audiovisualizer automatically freezes when a peak is detected that is above the user defined threshold

### Design/Evaluation Achievements
- **Design Achievement 1**: I ensured that my application would run on both desktops / mobile devices
- **Design Achievement 2**: I notified the user extensively that there microphone would be used and they had to provide consent 2 times.
- **Design Achievement 3**: My application accepts canned audio files for people who do not want to enable the use of there microphone.
