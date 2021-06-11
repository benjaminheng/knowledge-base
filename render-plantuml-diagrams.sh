#!/bin/bash

for i in $(find ./static/resource/plantuml -type f -path "*.plantuml"); do
    echo "Rendering $i"
    outputFile=$(echo "$i" | sed 's/.plantuml$/.svg/')
    cat "$i" | docker run --rm -i think/plantuml > "$outputFile"
    echo "Rendered $i to $outputFile"
done
