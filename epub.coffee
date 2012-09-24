fs = require 'fs'
exec = require("child_process").exec

toc = [
	"documentation"
	"synopsis"
	"globals"
	"stdio"
	"timers"
	"modules"
	"addons"
	"process"
	"util"
	"events"
	"domain"
	"buffer"
	"stream"
	"crypto"
	"tls"
	"string_decoder"
	"fs"
	"path"
	"net"
	"dgram"
	"dns"
	"http"
	"https"
	"url"
	"querystring"
	"punycode"
	"readline"
	"repl"
	"vm"
	"child_process"
	"assert"
	"tty"
	"zlib"
	"os"
	"debugger"
	"cluster"  
	]
  
toc_markdown = []
for section in toc
  toc_markdown.push("markdown/#{section}.markdown")
  
toc_md_string = toc_markdown.join " "

exec "pandoc -S --epub-metadata=epub/metadata.xml -o epub/nodejs-manual.epub epub/title.txt #{toc_md_string}", (err, stdout, stderr) ->
  if err
    console.log err