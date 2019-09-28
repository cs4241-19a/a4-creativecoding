## Visualizer for co2 emission data

http://a4-pedrodevasconcellosoporto.glitch.me

The goal of this application is to display the gloal emission of co2 by country using a world globe. Data was selected from 2010 as the most complete and ready for this application. The website allows you to rotate the globe and hover over each country, displaying their name and the desired information. The data displayed can be either for the total carbon emissions in metric tons of co2 or in emissions per capita. The distinction is made with a dropdown selector in the navigation bar. Also in the navigation bar, the user can lock and free the globes rotation that happens with the mouse click and drag. The map will highlight each country with a different colour, which is the main part of the visualization. The color spectrum goes from green to red, where green represents low emissions and red represents high emissions. The scale is generated relatively based on the countries with the highest emissions and the gradient curve follows a log function. This is because countries like China and the US pollute the atmosphere disproporytionately more according to the data. When the user switches back and forth from total and per capita, the map adjustes the colours accordingly (with a slight glitch with projections overlaying that disappears when the globe is dragged)

In times where data is abundand but it is becoming surprisingly common for people to denny what it tells us about, for example, climate change, it is crucial that us as data/computer scientists produce visualizations that can help people from diverse backgrounds become more data literate.

## Technical Achievements
- **Tech Achievement 1**: Implemented advanced globe d3 geo visualization
- **Tech Achievement 2**: Incorporated globe rotation based on mousedown, mousemove, and mouseup
- **Tech Achievement 3**: Added control that locks and frees globe from rotation
- **Tech Achievement 4**: Correctly alligned land and country topojson data unto the globe persistent through rotations
- **Tech Achievement 5**: Succesfully mapped co2 emission data for each country to their geometry data in the topojson 
- **Tech Achievement 6**: Added control that allowed swicthing back and forth between total and per capita data for every country, that immediately updated the textbox pop ups and country colors

### Design/Evaluation Achievements
- **Design Achievement 1**: I ensured that my application would run on both desktops / mobile devices by combining d3 with Bulma sections and navigation bars
- **Design Achievement 2**: Tested application with several international student users who were able to look at their own countries data easily
- **Design Achievement 3**: Successfully communicated at a first glance the discrepancy between countries like the US and others in Europe, both developed, but with very different carbon emissions
