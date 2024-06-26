import Colors from "./Colors"

export function numeroAMes(numeroMes){

    let mes = ""

    switch(numeroMes){

        case("1"):
        case("01"):
            mes="enero"
            break

        case("2"):
        case("02"):
            mes="febrero"
            break

        case("3"):
        case("03"):
            mes="marzo"
            break

        case("4"):
        case("04"):
            mes="abril"
            break    

        case("5"):
        case("05"):
            mes="mayo"
            break     
            
        case("6"):
        case("06"):
            mes="junio"
            break  

        case("7"):
        case("07"):
            mes="julio"
            break  

        case("8"):
        case("08"):
            mes="agosto"
            break  

        case("9"):
        case("9"):
            mes="septiembre"
            break  

        case("10"):
            mes="octubre"
            break  

        case("11"):
            mes="noviebre"
            break 

        case("12"):
        mes="diciembre"
        break 

        default:
            mes="diciembre"

    }

    return mes


}

export function numeroAMesShort(numeroMes){

    let mes = ""

    switch(numeroMes){

        case("1"):
        case("01"):
            mes="ENE"
            break

        case("2"):
        case("02"):
            mes="FEB"
            break

        case("3"):
        case("03"):
            mes="MAR"
            break

        case("4"):
        case("04"):
            mes="ABR"
            break    

        case("5"):
        case("05"):
            mes="MAY"
            break     
            
        case("6"):
        case("06"):
            mes="JUN"
            break  

        case("7"):
        case("07"):
            mes="JUL"
            break  

        case("8"):
        case("08"):
            mes="AGO"
            break  

        case("9"):
        case("9"):
            mes="SEP"
            break  

        case("10"):
            mes="OCT"
            break  

        case("11"):
            mes="NOV"
            break 

        case("12"):
        mes="DIC"
        break 

        default:
            mes="diciembre"

    }

    return mes


}

export function asignarColor(colorDado){

    let color

    switch (colorDado) {

        case ("morado"):
            color = Colors.MoradoElemento
            break;
        case ("rojo"):
            color = Colors.RojoElemento
            break
        case ("verde"):
            color = Colors.VerdeElemento
            break
        case ("naranja"):
            color = Colors.NaranjaElemento
            break    
        case ("azul"):
        color = Colors.AzulElemento
        break            
        default:
            color = Colors.MoradoElemento

    }

    return color

}



export function fechaAString(date){

   return(date.split("-")[2]+" "+numeroAMesShort(date.split("-")[1])+" "+date.split("-")[0])
}