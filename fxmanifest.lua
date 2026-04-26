fx_version 'adamant'

game 'gta5'

this_is_a_map 'yes'

client_script {
    '@es_extended/locale.lua',
	'client.lua'
}

server_script {
    '@es_extended/locale.lua',
	'server.lua'
}

ui_page 'html/index.html'

files{
	"html/script.js",
	"html/jquery.min.js",
	"html/jquery-ui.min.js",
	"html/styles.css",
	"html/img/*.svg",
	"html/img/*.png",
	"html/img/*.jpg",
	"html/img/*.*",
	"html/*.*",
	"html/index.html",
}

dependency 'es_extended'
 