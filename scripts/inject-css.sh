#!/bin/bash

for subfolder in build/*; do
	if [ -d "$subfolder" ]; then
		css_files=$(find $subfolder -name "*.css")

		devtools_file=$(find $subfolder -name "devtools.*.html")

		for file in $css_files; do
			relative_file=$(basename $file)

			link_tag="<link rel=\"stylesheet\" href=\"$relative_file\" />"

			cat $devtools_file

			sed -i "s|</head>|$link_tag</head>|" $devtools_file
		done
	fi
done

