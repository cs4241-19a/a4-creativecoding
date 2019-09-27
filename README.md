## Livestock Production by Region

Hosting link: https://dkaravoussianis-a4-dkaravoussianis-demi-karavoussianis.glitch.me/

I used the data set from The Food and Agriculture Organization of the United Nations (FAO) involving the amount of animal usage (by kg protein) in various Global Regions, to create an interactive graph displaying the Livestock Production by Region. 

Data from: http://www.fao.org/gleam/results/en/

The overarching goal of this project is to raise awareness about the livestock production, which correlates to global warming. This dataset provided a lot of interesting information, which I limited to focus on livestock production by region.

My challenges while creating this project mostly were related to D3 working as I intended. Selecting all the data, with each entries corresponding to a rectangle, and getting the bars to change was difficult. The order of calling select statements was confusing at first, until getting one working.
## Technical Achievements
- **Tech Achievement 1**: I heavily reformatted and reduced the original dataset to only include the information for my visualization
- **Tech Achievement 2**: I used Git Gist to host my dataset, rather than using a locally stored spreadsheet.



### Design/Evaluation Achievements
- **Design Achievement 1**: I maintained the color idiom representing the different animal species with distinctive bins. I made sure to make sure each of the colors had the same perceived luminance and saturation, so they would all look "equal".
- **Design Achievement 2**:  I chose to create pre-determined zooming, because I had read that free-zooming can be too involved for the user. If the program zooms too much, the user can lose focus on the objects, and it can be difficult to reset. With the ability to zoom freely, the user can lose sight of parts of the graph and may not be able to see, and make unexpected conclusions from the graph. When the graph is zoomed, in order to allow the user to focus on the data within that range, but not forget there is more data, any data that exceeds the zoomed scale is presented as a partially transparent bar. 
- **Design Achievement 3**: As another design achievement, I decided to create a static tooltip, to reduce occlusion while hovering
- **Design Achievement 4**: I also selected black as the hover-highlighting color due to the strong contrast to any of the other colors used to differentiate species.
