#!/bin/bash

for subfolder in build/*; do
	if [ -d "$subfolder" ]; then
		css_files=$(find $subfolder -name "*.css")

		devtools_file=$(find $subfolder -name "devtools.*.html")

		echo "css files"
		echo $css_files

		for file in $css_files; do
			relative_file=$(basename $file)

			link_tag="<link rel=\"stylesheet\" href=\"$relative_file\" />"

			echo $link_tag

			echo $relative_file
		
			echo $devtools_file

			ls

			dir=pwd

			sed -i '' "s|</head>|$link_tag</head>|" $dir/$devtools_file
		done
	fi
done

