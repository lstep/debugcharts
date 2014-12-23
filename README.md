debugcharts
===========

Go memory debug charts.

This package uses chart library [Highcharts](http://www.highcharts.com/). It is free for personal and non-commercial use. Please buy a license otherwise.

Development
-----------

You will need the go-binddata program/package to be able to integrate the JS/CSS files.
`go get github.com/jteeuwen/go-bindata/...`

Then, to compile the .go file that would include the .js & .css, just type :
`go-bindata -debug=true -pkg="bindata" static/`

Installation
------------
`go get -v -u github.com/mkevac/epochcharts`

Usage
-----
Just install package and start http server. There is an example program [here](https://github.com/lstep/epochcharts/blob/master/example/example.go).

Then go to `http://localhost:8080/debug/charts`. You should see something like this:
<img src="example/screenshot.png" />

Data is updated every second. We keep data for last day.
