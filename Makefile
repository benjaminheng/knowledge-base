dev:
	hugo server --buildDrafts

archive:
	test -d ~/dev/knowledge-base
	test -d ~/dev/link-archive/archive
	archiver --input ~/dev/knowledge-base --output ~/dev/link-archive/archive
	(cd ~/dev/link-archive/archive && git status)
	(cd ~/dev/link-archive/archive && git add . && git commit -m "Update archive" && git push)

plantuml:
	./render-plantuml-diagrams.sh

diagrams:
	md-code-renderer render --languages "dot,plantuml" --output-dir ./static/resource/diagrams/ --link-prefix "/resource/diagrams/" ./content/*.md
	md-code-renderer clean --image-dir ./static/resource/diagrams/ ./content/*.md
