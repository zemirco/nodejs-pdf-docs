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

for section in toc
	exec "pandoc markdown/#{section}.markdown -t epub -o epub/#{section}.epub", (err, stdout, stderr) ->
		if err
			console.log err
