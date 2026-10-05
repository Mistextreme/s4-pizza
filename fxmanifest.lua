fx_version 'cerulean'

game 'gta5'

lua54 'yes'

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

files {
    "html/*.*",
    "html/img/*.*",
}

dependency 'es_extended'