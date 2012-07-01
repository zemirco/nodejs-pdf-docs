fs = require 'fs'
exec = require("child_process").exec

toc = [
	"addons"
	"appendix_1"
	"assert"
	"buffer"
	"child_process"
	"cluster"
	"crypto"
	"debugger"
	"dgram"
	"dns"
	"documentation"
	"domain"
	"events"
	"fs"
	"globals"
	"http"
	"https"
	"modules"
	"net"
	"os"
	"path"
	"process"
	"punycode"
	"querystring"
	"readline"
	"repl"
	"stdio"
	"stream"
	"string_decoder"
	"synopsis"
	"timers"
	"tls"
	"tty"
	"url"
	"util"
	"vm"
	"zlib"
	]
  
toc_markdown = []
for section in toc
  toc_markdown.push("markdown/#{section}.markdown")
  
toc_md_string = toc_markdown.join " "

exec "pandoc -S --epub-metadata=epub/metadata.xml -o epub/nodejs-manual.epub epub/title.markdown #{toc_md_string}", (err, stdout, stderr) ->
  if err
    console.log err