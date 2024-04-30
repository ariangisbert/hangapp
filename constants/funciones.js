export function numeroAMes(numeroMes){

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
        mes="DEC"
        break 

        default:
            mes="ENE"

    }

    return mes


}