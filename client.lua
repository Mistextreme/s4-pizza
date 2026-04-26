

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
  end
end)


local suankiSiparis = {}
local siparis_talebi = false


local konum = vector3(285.9165, -983.4594, 29.43152)
local konum2 = vector3(283.2527, -978.5802, 29.43152)
local konum3 = vector3(287.0769, -978, 29.43152)

function siparisOlustur() 

  local pizzaboyu = math.random(1, 3)
  
  if pizzaboyu == 1 then 
    suankiSiparis.pizza = "pizzakucuk"
	suankiSiparis.pizzaucret = math.random(1, 10)
  elseif pizzaboyu == 2 then 
    suankiSiparis.pizza = "pizzaorta"
	suankiSiparis.pizzaucret = math.random(10, 20)
  else 
    suankiSiparis.pizza = "pizzabuyuk"
	suankiSiparis.pizzaucret = math.random(20, 30)
  end
  

end

Citizen.CreateThread(function()

 
	while true do
		sleepthread = 2000
				local pPed = PlayerPedId()
				local pCoords = GetEntityCoords(pPed)
				local distance = #(pCoords - konum)
				local distance2 = #(pCoords - konum2)
				local distance3 = #(pCoords - konum3)

				if distance <= 5.0 then
					sleepthread = 1
					if distance <= 1.5 then
						DrawText3D(konum.x+0.5, konum.y , konum.z + 0.3, '[E] - Pizza hazırla')
						if IsControlJustPressed(1, 38) then
						   
						  ESX.TriggerServerCallback('s4:pizza:server:malzemeKontrol', function(malzeme)
                             if malzeme == true then 
							  	SendNUIMessage({ action = "pizza" })
                                SetNuiFocus(true, true)
							 else 
							   
							 end
                          end)
						  Wait(1000)
						end
					end
				end				
				
				if distance2 <= 5.0 then
					sleepthread = 1
					if distance2 <= 1.5 then
				 
						DrawText3D(konum2.x + 0.3, konum2.y + 0.9 , konum2.z + 0.3, '[E] - Siparişi kapat')

						if IsControlJustPressed(1, 38) then
                          dolapmenu()
						  Wait(1000)
						end
					end
				end
				
				if distance3 <= 5.0 then
					sleepthread = 1
					if distance3 <= 1.5 then
						DrawText3D(konum3.x + 0.3, konum3.y + 0.9 , konum3.z + 0.3, '[E] - Siparişi Talep et')
						if IsControlJustPressed(1, 38) then
						 if siparis_talebi == true then
						  ESX.ShowNotification("Zaten bir talep oluşturdun.")
						 else 
						  pedspawn()
						  siparisOlustur()
						  siparis_talebi = true
						 end
                          
						  Wait(1000)
						end
					end
				end
		Citizen.Wait(sleepthread)
	end
end)

function DrawText3D(x, y, z, text)
	SetTextScale(0.30, 0.30)
    SetTextFont(0)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    SetDrawOrigin(x,y,z, 0)
    DrawText(0.0, 0.0)
    local factor = (string.len(text)) / 250
    DrawRect(0.0, 0.0+0.0125, 0.017+ factor, 0.03, 0, 0, 0, 75)
    ClearDrawOrigin()
end
 
RegisterCommand("pizza", function(source, args, rawCommand)
 SendNUIMessage({ action = "pizza" })
 SetNuiFocus(true, true)
end, false)


RegisterCommand("spawnped", function(source, args, rawCommand)
  pedspawn()
end, false)

RegisterNUICallback("pizzaver", function(data)
  TriggerServerEvent("s4:pizza:server:pizzaver", data.boy)
  SetNuiFocus(false, false)
end)
 
function dolapmenu()

	local elements = {  
    { label = 'Domates', value = 'domates'},
    { label = 'Soğan', value = 'sogan'},
	{ label = 'Biber', value = 'biber'},
	{ label = 'Sucuk', value = 'sucuk'},
	{ label = 'Salam', value = 'salam'},
	{ label = 'Zeytin', value = 'zeytin'},
	{ label = 'Mantar', value = 'mantar'}
	}
	
	ESX.UI.Menu.CloseAll() 
	ESX.UI.Menu.Open('default', GetCurrentResourceName(),'ventacyc',{
		title = 'Malzeme dolabı', 
		align = 'top-right',
		elements = elements  
	
	}, function(data, menu)
	
	for k, v in ipairs(elements) do
	   if data.current.value == v.value then 
	    menu.close()
		local ped = PlayerPedId()
        exports['mythic_progbar']:Progress({
            name = v.label,
            duration = 3250,
            label = v.label..' Alınıyor.',
            useWhileDead = false,
            canCancel = true,
            controlDisables = {
                disableMovement = true,
                disableCarMovement = true,
                disableMouse = false,
                disableCombat = true,
            },
            animation = {
                animDict = "mini@repair",
                anim = "fixing_a_ped",
                flags = 49,
            }
        }, function(cancelled)
            if not cancelled then
				TriggerServerEvent("s4:pizza:server:malzemever", v.value)
            end
        end)
	   end
	end
 
end, function(data, menu)
	menu.close()
	TriggerEvent('notification', 'Almaktan vazgeçtin!', 2, 2000)
end, function(data, menu)
end)
end



function pedspawn() 

local l
local m = -10
local n = -10
local o = 0
local b
local p
local q = 200
local r = "a_m_m_bevhills_01"
local teslim = false
local Bs = true
Citizen.CreateThread(function()

 
 
        ClearPedTasks(GetPlayerPed(-1))
        local s = math.random(1, 2)
        if s == 1 then
            RequestModel("a_f_m_bevhills_02")
            while not HasModelLoaded("a_f_m_bevhills_02") do
                Wait(10)
            end
            r = "a_f_m_bevhills_02"
        else
            RequestModel("a_m_m_bevhills_01")
            while not HasModelLoaded("a_m_m_bevhills_01") do
                Wait(10)
            end
            r = "a_m_m_bevhills_01"
        end
        local t = GetEntityCoords(GetPlayerPed(-1))
        local u = math.random(1, 2)
        local v = math.random(1, 2)
        if u == 1 then
            m = -35
        else
            m = 35
        end
        if v == 1 then
            n = -35
        else
            n = 35
        end
        Wait(500)
        local w, A = GetGroundZFor_3dCoord(t.x + m, t.y + n, t.z, 0)
        l = CreatePed(26, r, 281.5121, -934.8923, 29.2124, 28, 268.9422, true, true)
        PlaceObjectOnGroundProperly(l)
        SetEntityAsMissionEntity(l)
        SetBlockingOfNonTemporaryEvents(l, true)
        SetPedKeepTask(l, true)
		TaskGoStraightToCoord( l  ,  289.0022, -975.378, 29.43152,  150 , 100000  , 1, 1  )
        SetPedKeepTask(l, true)
        o = 0
        
        peddevam = true
        while Bs do
            Citizen.Wait(500)
            local C = GetEntityCoords(l)
            local t = GetEntityCoords(GetPlayerPed(-1))
            q = GetEntityHealth(l)
            local D = Vdist(C.x, C.y, C.z, t.x, t.y, t.z)
            o = o + 1
            if D <= 1.5 or o >= 75 or q < 100 then
                --B = false
                    if not teslim then 
					  menuTeslim()
                    end
					teslim = true
					Wait(1000)
            end
			
        end
         
		
        if o >= 75 or q < 1.0 then
            ESX.ShowNotification("~r~Müşteri siparişi son anda iptal etti. Yeni bir müşteri bekleyebilirsin.")
            TaskWanderStandard(l, 10.0, 10)
            SetPedAsNoLongerNeeded(l)
			siparis_talebi = false
            teslim = false
        else
		    
            siparis_talebi = false
            teslim = false
			 
            
            Wait(1550)
			
            DeleteEntity(b)
            DeleteEntity(p)
            ClearPedTasks(pid)
            ClearPedTasks(l)
            TaskWanderStandard(l, 10.0, 10)
            SetPedAsNoLongerNeeded(l)
            x, y, z = table.unpack(GetEntityCoords(GetPlayerPed(-1), true))
            playerX = tonumber(string.format("%.2f", x))
            playerY = tonumber(string.format("%.2f", y))
            playerZ = tonumber(string.format("%.2f", z))
            TaskGoStraightToCoord( l  ,  281.5121, -934.8923, 29.2124,  100 , 100000  , 1  , 1  )
            Citizen.Wait(500)
        end
 
 


end)

 





function menuTeslim()

	local elements = {  
    { label = 'Sipariş bilgisi', value = 'siparis'},
    { label = 'Siparişi teslim et', value = 'teslimet'},
	{ label = 'Çık', value = 'iptal'},
 
	}
	
	ESX.UI.Menu.CloseAll() 
	ESX.UI.Menu.Open('default', GetCurrentResourceName(),'ventacyc',{
		title = 'Müşteri', 
		align = 'top-right',
		elements = elements  
	
	}, function(data, menu)
	
	
	   if data.current.value == "siparis" then 
	    menu.close()
		local pizzasip = nil
		if suankiSiparis.pizza == "pizzakucuk" then 
		    pizzasip = "Küçük boy pizza"
		elseif suankiSiparis.pizza == "pizzaorta" then 
		    pizzasip = "Orta boy pizza"
		else 
		    pizzasip = "Büyük boy pizza"
		end
		
		ESX.ShowNotification("Müşterinin siparişi : 1 adet "..pizzasip.." .")
            
        teslim = false
	   end
	   
	   if data.current.value == "teslimet" then 
	    menu.close()
		TriggerServerEvent("s4:pizza:server:teslimat", suankiSiparis)
		Bs = false
        teslim = false
	   end
	   
	   if data.current.value == "iptal" then 
	    menu.close()
        teslim = false
		
	   end
	 
 
end, function(data, menu)
	menu.close()
	TriggerEvent('notification', 'Almaktan vazgeçtin!', 2, 2000)
	teslim = false
end, function(data, menu)
end)
end


end




