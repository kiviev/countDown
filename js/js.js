



function relojCuentaAtras(hora,dia,mes,anyo,lugar){
	//es la funcion principal, se crea el objeto tiempo que despues con la funcion cuentaAtras() se ira rellenando
	//despues se crea el reloj en el lugar que le indiquemos en el argumento
	//ahora creamos el setinterval de 1 seg que ejecute la funcion cuentaAtras() pasandole los argumentos de relojCuentaAtras hora,dia, mes y año
	//para despues imprimirlo en los divs creados con creaDivReloj con sus id correspondientes
		var tiempo={};
		creaDivReloj(lugar);
		var x = setInterval(function(){
			cuentaAtras(hora,dia,mes,anyo);
			imprimir();
		},1000);//fin de setInterval de la var x
	
	function creaDivReloj(lugar){
		//esta funcion sirve para que se cree el reloj el el lugar que le indiquemos, con el selector jquery que queramos
		var x= $(lugar);
		console.log(lugar)

		if(lugar == undefined){
			//si no esta definido crea una alerta 
			alerta('<p style="color:red">ERROR</p><p>No ha definido el lugar donde quiere insertar el Reloj de Cuenta Atrás</p>');
		}else if(!x.length){
			//si esta definio pero no existe en el html crea una alertaa
			alerta('<p style="color:red">ERROR</p><p>El lugar donde ha definido que aparezca el Reloj de Cuenta Atrás no existe</p>');
		}
		else{
			//si esta definido y existe el lugar lo ejecuta
			$(lugar).html('<div class="cuentaAtras"><p class="dias">días</p><p class="horas">horas</p><p class="min">min</p><p class="seg">seg</p></div>');
		}
	
	}//fin de creaDivReloj
	function imprimir(){
		//Esta funcion imprime los reslultados en los divs creados con creaDivReloj() y sisi tiempo.dias esta definido lo imprime y si no, imprime 00
		if(tiempo.dias !=undefined){
				if(tiempo.dias<10){
					$('.dias').html('<span class="fontNum"> 0'+tiempo.dias +'</span> '+' días ' );
				}else{
						$('.dias').html('<span class="fontNum"> '+tiempo.dias +'</span> '+' días ' );
					}
				if(tiempo.horas<10){
					$('.horas').html('<span class="fontNum"> 0'+tiempo.horas +'</span> '+' horas ' );
				}else{
					$('.horas').html('<span class="fontNum"> '+tiempo.horas +'</span> '+ ' horas ' );
					}
				if(tiempo.min<10){
					$('.min').html('<span class="fontNum"> 0'+tiempo.min +'</span> '+' min ' );
				}else{
					$('.min').html('<span class="fontNum"> '+tiempo.min +'</span> '+ ' min ' );	
					}
				if(tiempo.seg<10){
					$('.seg').html('<span class="fontNum"> 0'+tiempo.seg +'</span> '+' seg ' );
				}else{
					$('.seg').html('<span class="fontNum"> '+tiempo.seg +'</span> '+ ' seg ' );
					}			
			
		}else{
			$('.dias').html('<span class="fontNum"> 00</span> '+' días ' );
			$('.horas').html('<span class="fontNum"> 00</span> '+ ' horas ' );
			$('.min').html('<span class="fontNum"> 00</span> '+ ' min ' );
			$('.seg').html('<span class="fontNum"> 00</span> '+ ' seg ' );
		}
		
	}//fin de imprimir

	function cuentaAtras(hora,dia,mes,anyo){
		// aqui primero comprobamos si la fecha es correcta(si la hora,dia,mes y año es posterior al momento de ejecucion y si es una fecha correcta, pej si el 29 de febrero es un dia que existe en este año)
		var fechaCorr=fechaCorrecta(hora,dia,mes,anyo);
		//si la fecha introducida es correcta ( o sea es posterior a la fecha y hora del dia en curso)
		if(fechaCorr){
			//si es correcta se crea un objeto date y con el se opera
			//se utiliza la funcion segHanPasado, para establecer cuantos segundos han pasado desde el inicio del año 2000 hasta la fecha de hoy en la var segHoy y en la var segFecha establecida. Para luego encontrar la diferencia y asi sabremos cuantos dias, horas, minutos y segundos faltan desde el momento en que se ejecute este script hasta la fecha establecida
			var d= new Date();
			var segHoy= segHanPasado(d.getHours(),d.getDate(),d.getMonth()+1,d.getFullYear()) + ((d.getMinutes()*60)+d.getSeconds());
			var segFechaEstablecida = segHanPasado(hora,dia,mes,anyo);

			var diferencia= segFechaEstablecida-segHoy;
			//aqui se hacen los calculos
			tiempo.dias=Math.floor(diferencia/86400);
			tiempo.horas=Math.floor(diferencia/3600)-(tiempo.dias*24);
			tiempo.min=(Math.floor(diferencia/60)) - (tiempo.dias*1440) - (tiempo.horas*60);
			tiempo.seg=diferencia -(tiempo.dias*86400) - (tiempo.horas*3600)- (tiempo.min*60);	
			if( diferencia<1){
				fechaCorr=fechaCorrecta(d.getHours(),d.getDate()+1,d.getMonth()+1,d.getFullYear());
				//si el contador ha llegado a 0 detenemos el setInterval y ejecutamos la funcion que queramos
				//clearInterval(x);
				/*
				********
				aqui poner la funcion que queremos ejecutar cuando el contador llegue a 0
				********
				*/
				/*alerta('<p style="color:red">OOPS</p><p>La cuenta atrás ha llegado a su Fin.</p>');*/
			}// fin de if( diferencia==0)	
		}//fin if(fechaCorr)
	
	}//fin de cuenta atras

	function fechaCorrecta(hora,dia,mes,anyo){
		//sirve para determinar si la fecha es correcta ( si no es anterior al momento en que se ejecuta y si no se pone una fecha que no exista pej 32 de Enero o 29 de Febrero de un año no bisiesto)
		var d=new Date();
		var dHoy = d.getDate(), horHoy= d.getHours(), minHoy=d.getMinutes(), secHoy=d.getSeconds(), mesHoy=(d.getMonth()+1), anyoHoy=d.getFullYear();
		//se generan los strings que necesitaremos para imprimir cuando pongamos la fecha erronea
		var stringFechacuentaAtras= hora + ' horas del dia: ' + dia + ' del mes: ' + mes + ' del año: ' + anyo ;
		var stringFechaHoy =horHoy + ' horas del dia: ' + dHoy + ' del mes: '+ mesHoy + ' del año: ' + anyoHoy;
		var stringAlerta='<p style="color:red">ERROR</p> <p>Usted ha puesto una fecha anterior a la fecha de ahora o es incorrecta en el reloj de cuenta atras.</p> <p>La fecha tope  que ha puesto es: </p>'+ '<p style="color:red">'+stringFechacuentaAtras +'</p> <p>y hoy es: </p><p>' + stringFechaHoy + '</p>';

		//aqui se comprueba si la fecha y la hora introducida es anterior a la fecha del dia corriente
		if( (anyo<anyoHoy ) 
				|| (   (mes<mesHoy) && (anyo==anyoHoy)  )   
				|| ( (dia<dHoy  ) && ( mes==mesHoy ) && ( anyo== anyoHoy ) 
				|| ( (hora>23) || (  ( hora<=horHoy)  && ( dia==dHoy ) && ( mes==mesHoy ) && (anyo==anyoHoy  ) )   )  )
			 ){		
				alerta(stringAlerta);
				return false;
		}//fin del if( (anyo<anyoHoy )
		else{	
			//aqui compruebo que los dias del mes sean los correctos, incluyendo los años bisiestos	
			switch(mes){
				case 1:
					if(dia>31){ return false};
					break;
				case 2:
				var bisiesto=esBisiesto(anyo);
					
					if(bisiesto){
						if(dia>29){ alerta(stringAlerta); return false}
					}else{
						if(dia>28){ alerta(stringAlerta); return false}
					}
					break;
				case 3:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
				case 4:
					if(dia>30){ alerta(stringAlerta); return false};
					break;
				case 5:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
				case 6:
					if(dia>30){ alerta(stringAlerta); return false};
					break;
				case 7:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
				case 8:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
				case 9:
					if(dia>30){ alerta(stringAlerta); return false};
					break;
				case 10:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
				case 11:
					if(dia>30){ alerta(stringAlerta); return false};
					break;
				case 12:
					if(dia>31){ alerta(stringAlerta); return false};
					break;
			}//fin del switch
				return true;
		}//fin del else
	}// fin de fechaCorrecta()
	function alerta(str){
		//esta funcion la utilizo para crear un div de alerta con la informacion de los strings que creamos en fechaCorrecta(), esta funcion esta dentro de fechaCorrecta() asi que puede utilizar sus variables
		$('body').prepend('<div class="alerta"></div>');
		var al=$('.alerta');
		var estilos={
			'background': 'rgba(0,0,0,0.7)', 
			'width': '100%', 
			'height': '100%', 
			'position': 'fixed', 
			'top': '0', 
			'left': '0', 
			'rigth': '0', 
			'bottom': '0' , 
			'z-index': '100000', 
			'display': 'table'
		}//fin estilos
		al.css(estilos);
		al.html('<div class="alertaDentro"></div>');
		var dentro=$('.alertaDentro');
		dentro.html('<p>'+ str + '</p>')
		var estilosDentro={
			'background': 'rgba(255,255,255,0.8)',
			'width': '50%',  
			'margin': '0 auto',
			'position': 'relative', 
			'top': ( (al.height()/2)-(dentro.height()))+'px'
		}//fin estilosDentro
		dentro.css(estilosDentro);
		//paramos el setInterval, ya que sino seguiria creando todos estos divs en cada intervalo
		clearInterval(x);

	}//fin de alerta(str)
	function esBisiesto(num){
		//para comprobar si un año es bisiesto o no.   Si lo es devuelve true, si no false
		if( (num%4==0) && ( ( !(num%100==0) ) || ( num%400==0 )  ) ){
			return true;
		}else { return false;} 
	} // fin de esBisiesto()

	function segHanPasado(hora,dia,mes,anyo){
		//sirve para comprobar cuantos segundos han pasado desde una fecha fija (el principio del año 2000) hasta la fecha que le pasamos como argumento 
		var anyoRef=2000;
		var horasASegundos=hora*3600;
		var diasASegundos=0;
		//aqui utilizo la funcion bis, para determinar si el mes de febrero tiene 28 o 29 dias
		var diasMes =[31,bis(anyo),31,30,31,30,31,31,30,31,30,31];
		var diasPorAnyo=0;

		for(i=anyoRef; i<anyo; i++){
			if(esBisiesto(i)){			
				diasPorAnyo+=366;
			}else{
				diasPorAnyo+=365;
			}
		}//fin del for
		diasPorAnyo+=(dia-1);
		for(i=0;i<mes-1;i++){
			diasPorAnyo+=diasMes[i];
		}//fin del for
		diasASegundos=diasPorAnyo*86400;
		var totalSegundos=horasASegundos+diasASegundos;
			return totalSegundos;
	}//fin segHanpasado()
	function bis(anyo){
		//comprueba si el año que le pasamos como argumento es bisiesto y si lo es devuelve 29 , si no 28 
				var bisiesto=esBisiesto(anyo);
				if(bisiesto){
					return 29;
				}else{return 28;}
			}//fin bis()
}// fin de relojCuentaAtras()
