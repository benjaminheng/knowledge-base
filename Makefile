dev:
	hugo server --buildDrafts

archive:
	test -d ~/dev/knowledge-base
	test -d ~/dev/link-archive/archive
	archiver --input ~/dev/knowledge-base --output ~/dev/link-archive/archive
	(cd ~/dev/link-archive/archive && git status)
	(cd ~/dev/link-archive/archive && git add . && git commit -m "Update archive" && git push)
