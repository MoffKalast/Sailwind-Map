# Contributing Guide

As mentioned in the ReadMe, the framework used is ArcGIS, here's some info on it:
- https://developers.arcgis.com/javascript/latest/ 
- https://community.esri.com/t5/arcgis-online-documents/tkb-p/arcgis-online-docs

Here's a general rundown:

- [main.js](js/main.js) ArcGIS instance and rendering

- [misc.js](js/misc.js) Static utility functions

- [modal.js](js/modal.js) Handles opening and closing of HTML windows

- [graphics.js](js/graphics.js) Reusable font, icon, etc. definitions

- [grid_lines.js](js/grid_lines.js) Defines the map parallel lines

- [grid_routes.js](js/grid_routes.js) Defines trade routes

- [grid_winds.js](js/grid_winds.js) Defines trade winds

- [polygon_definitions.js](js/polygon_definitions.js) Abandon hope all ye who enter here


## Updating layer data

The current approach for getting data from the game onto the map is as follows.

### 1. Install CoordinateViewer

This entails installing the Unity mod manager, SailwindModdingHelper and the mod itself. The latter two can be found on the Sailwind Discord.

### 2. Change settings

Set the viewer settings to max frequency and percision. This is typically capped at 8 decimals and 5 Hz, though more would be better since we can easily remove points later.

```xml
<?xml version="1.0" encoding="utf-8"?>
<CoordinateViewerSettings xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <DecimalPrecision>8</DecimalPrecision>
  <RecordTimer>5</RecordTimer>
  <coordinateKey>
    <keyCode>I</keyCode>
    <modifiers>0</modifiers>
  </coordinateKey>
  <recordKey>
    <keyCode>N</keyCode>
    <modifiers>0</modifiers>
  </recordKey>
</CoordinateViewerSettings>
```

### 3. Record data

Create the island shape by walking around it while coordinate recording is enabled. This should generate a file that looks roughly like so:

```
28.1286563873 3.0316991806 15.974 332.9382
28.1307353973 3.0300571918 16.01409 332.9251
28.131778717 3.0269908905 16.05412 332.9241
28.1348724365 3.0267660618 16.09426 332.924
28.136882782 3.0233945847 16.13429 332.924
28.1391849518 3.0216836929 16.17444 326.8558
```

Recordings of current islands can be found in [raw_coords](raw_coords). I would suggest including yours as well so they can be re-imported in the future if anything needs changing at some future date.

### 4. Import Coords

Find the `coords_0.txt` file in `C:\Program Files (x86)\Steam\steamapps\common\Sailwind\Mods\CoordinateViewer` and import it onto the web map. 

Note that doing multiple recordings in a row will just concat data to the same file, so this is a good time to rename it to something else.

###  5. Edit the path

Remove any points on straight sections to reduce point count and fix any other issues, note that the first and last point will connect together to form a polygon.

After you're done, open the console with F12 and run `pathToData()`. This should spit out the coordinates formatted properly for addition:

```json
[
    [
        -0.25970255636522,
        33.14784326860706
    ],
    [
        1.00000000000000,
        34.90667325296604
    ],
    [
        -0.99650971197506,
        34.83536933468122
    ],
    [
        -1.56694105825365,
        33.71827461488565
    ]
]
```

### 6. Add new island file

Island data is kept under `assets/islands/<region>`, where each file represents a landmass of some type.

```json
"region": "Aestrin",
"name": "Eastwind",
"type": "Polygon"
```

**Region** can be one of either: "Emerald Archipelago", "Al'Ankh", "Happy Bay", "Fire Fish Lagoon", "Aestrin", "City", or "Rock". These are set in [main.js](/js/main.js) as different rendering styles, but as of now all regions render in the same orange colour, City renders as red and Rock/Sand renders as gray.

**Name** refers to the actual label that will be rendered above the polygon, can be left as empty string if the island doesn't have a name.

**Type** can be either a single Polygon or a MultiPolygon array of them. The latter is presumably more preformant with only one draw call and it's probably best to merge together all unnamed islands and rocks in the same region.

Here's an example of both options:

```json
{
    "region": "Aestrin",
    "name": "SomeNewIsland",
    "type": "Polygon",
    "coordinates": [
        [
            [
                0.22230016363154,
                40.90540889294039
            ],
            [
                0.22466,
                40.90619
            ],
            [
                0.22478,
                40.90865
            ],
        ]
    ]
}

```

Make sure the brackets are right, otherwise the map will fail at loading the file.

```json
{
    "region": "Aestrin",
    "name": "SomeNewIsland",
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [
                    4.75075891704177,
                    31.35304322705834
                ],
                [
                    4.75067758560000,
                    31.35126113890000
                ],
                [
                    4.74902057650000,
                    31.35179901120000
                ]
            ]
        ],
        [
            [
                [
                    4.78302669530000,
                    31.30674934390000
                ],
                [
                    4.78072166440000,
                    31.31055641170000
                ],
                [
                    4.78203344350000,
                    31.31355285640000
                ]
            ]
        ]
    ],
    "secret": false
}
```

Some entries have a "secret" parameter, which is not used for the time being.

### 7. Add the new files to the file list

In order to have the files loaded, open [island_loader.js](js/island_loader.js) and add all new files to either the `island_files` or `secret_island_files` list. 
```js
const island_files = [
    "aestrin/eastwind_0",
    "aestrin/eastwind_1",
    "aestrin/fort_aestrin_0",
```
```js
const secret_island_files = [
    "aestrin/rock_of_despair",
    "alankh/cities/eleann_island_city",
```
That's it. Thanks :)