local ESX = exports['es_extended']:getSharedObject()   -- [FIX 1]

-- [FIX 2] Single cached reference to the full item table.
-- Populated on first use (lazy) and pre-warmed on resource start.
local EsxItems = nil

-- Pre-warm the cache after all resources have had a chance to register items.
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    Citizen.Wait(1000)
    EsxItems = ESX.GetItems()
end)

-- Lazy initializer — fallback if the cache missed (e.g. very early event).
local function getItems()
    if not EsxItems then
        EsxItems = ESX.GetItems()
    end
    return EsxItems
end

RegisterNetEvent("s4:pizza:server:malzemever")
AddEventHandler("s4:pizza:server:malzemever", function(malzeme)
    local src     = source
    local xPlayer = ESX.GetPlayerFromId(src)
    local items   = getItems()   -- [FIX 2] cached, not re-allocated
    xPlayer.addInventoryItem(malzeme, 1)
    TriggerClientEvent('inventory:client:ItemBox', src, items[malzeme], "add", 1)
end)

RegisterNetEvent("s4:pizza:server:teslimat")
AddEventHandler("s4:pizza:server:teslimat", function(suankiSiparis)
    local src     = source
    local xPlayer = ESX.GetPlayerFromId(src)
    local items   = getItems()   -- [FIX 2] cached, not re-allocated

    if xPlayer.getQuantity(suankiSiparis.pizza) >= 1 then
        TriggerClientEvent('mythic_notify:client:SendAlert', source, {
            type = 'success',
            text = "Sipariş teslim edildi, Bu siparişten kazancın " .. suankiSiparis.pizzaucret .. "$ ",
        })
        xPlayer.removeInventoryItem(suankiSiparis.pizza, 1)
        xPlayer.addInventoryItem('cash', suankiSiparis.pizzaucret)
        TriggerClientEvent('inventory:client:ItemBox', src, items[suankiSiparis.pizza], "remove", 1)
    else
        TriggerClientEvent('mythic_notify:client:SendAlert', source, {
            type = 'error',
            text = "Müşteriyi kandırmaya utanmıyormusun ibne.",
        })
    end
end)

RegisterNetEvent("s4:pizza:server:pizzaver")
AddEventHandler("s4:pizza:server:pizzaver", function(boy)
    local src     = source
    local xPlayer = ESX.GetPlayerFromId(src)
    local items   = getItems()   -- [FIX 2] cached, not re-allocated

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
    TriggerClientEvent('inventory:client:ItemBox', src, items[boy], "add", 1)
end)

ESX.RegisterServerCallback('s4:pizza:server:malzemeKontrol', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    local durum   = true
    local malzemeler = {
        { label = 'Domates', value = 'domates' },
        { label = 'Soğan',   value = 'sogan'   },
        { label = 'Biber',   value = 'biber'   },
        { label = 'Sucuk',   value = 'sucuk'   },
        { label = 'Salam',   value = 'salam'   },
        { label = 'Zeytin',  value = 'zeytin'  },
        { label = 'Mantar',  value = 'mantar'  },
    }

    for k, v in ipairs(malzemeler) do
        if xPlayer.getQuantity(v.value) >= 1 then
            -- item present, continue
        else
            TriggerClientEvent('mythic_notify:client:SendAlert', source, {
                type = 'error',
                text = v.label .. " Malzemesi eksik.",
            })
            durum = false
            break
        end
    end

    cb(durum)

    if durum == true then
        for k, v in ipairs(malzemeler) do
            xPlayer.removeInventoryItem(v.value, 1)
        end
    end
end)