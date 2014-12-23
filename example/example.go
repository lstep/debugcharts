package main

import (
	"log"
	"net/http"

	_ "github.com/lstep/epochcharts"
)

func main() {
	log.Fatal(http.ListenAndServe(":8088", nil))
}
