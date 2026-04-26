

ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent("s4:pizza:server:malzemever")
AddEventHandler("s4:pizza:server:malzemever", function(malzeme) 
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)
  local EsxItems = ESX.GetItems()
  xPlayer.addInventoryItem(malzeme, 1)
  TriggerClientEvent('inventory:client:ItemBox', src, EsxItems[malzeme], "add", 1)
end)

RegisterNetEvent("s4:pizza:server:teslimat")
AddEventHandler("s4:pizza:server:teslimat", function(suankiSiparis) 
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)
  local EsxItems = ESX.GetItems()
  
  if xPlayer.getQuantity(suankiSiparis.pizza) >= 1 then 
    TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = "Sipariş teslim edildi, Bu siparişten kazancın"..suankiSiparis.pizzaucret.."$ "  })
	xPlayer.removeInventoryItem(suankiSiparis.pizza, 1)
	xPlayer.addInventoryItem('cash', suankiSiparis.pizzaucret)
	TriggerClientEvent('inventory:client:ItemBox', src, EsxItems[suankiSiparis.pizza], "remove", 1)
  else 
   TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = "Müşteriyi kandırmaya utanmıyormusun ibne."  })
  end
  
end) 

RegisterNetEvent("s4:pizza:server:pizzaver")
AddEventHandler("s4:pizza:server:pizzaver", function(boy) 
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)
  local EsxItems = ESX.GetItems()
  
 
  if boy > 1 and boy < 20 then 
    boy = "pizzakucuk"
  elseif boy > 20 and boy < 30 then 
    boy = "pizzaorta"    
  elseif boy > 40 then 
    boy = "pizzabuyuk"
  else 
    boy = "pizza" 
  end
 
  xPlayer.addInventoryItem(boy, 1)
  TriggerClientEvent('inventory:client:ItemBox', src, EsxItems[boy], "add", 1)
end)


ESX.RegisterServerCallback('s4:pizza:server:malzemeKontrol', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
	local durum = true
    local malzemeler = {  
    { label = 'Domates', value = 'domates'},
    { label = 'Soğan', value = 'sogan'},
	{ label = 'Biber', value = 'biber'},
	{ label = 'Sucuk', value = 'sucuk'},
	{ label = 'Salam', value = 'salam'},
	{ label = 'Zeytin', value = 'zeytin'},
	{ label = 'Mantar', value = 'mantar'}
	}
	
	for k, v in ipairs(malzemeler) do
	  if xPlayer.getQuantity(v.value) >= 1 then 
	    
	  else
	    TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = v.label.." Malzemesi eksik."  })
		durum = false
		break;
	  end
	end
	
	cb(durum)
	
	if durum == true then 
	   for k, v in ipairs(malzemeler) do
	      xPlayer.removeInventoryItem(v.value, 1)
	   end
	end
 
end)