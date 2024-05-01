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
        mes="DEC"
        break 

        default:
            mes="diciembre"

    }

    return mes


}