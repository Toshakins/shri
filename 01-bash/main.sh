#!/bin/bash

declare -a STACK
declare SPOINTER=0;


function PUSH {
	let "SPOINTER += 1";
	STACK[$SPOINTER]=$1;
}

function POP {
	if [[ $SPOINTER -eq 0 ]]; then
		echo POP error
		$SPOINTER=0;
	else
		SDATA=${STACK[$SPOINTER]};
		let "SPOINTER -= 1";
	fi
}

function wrapper {
	BASE=`stat --format %x $1`
	DATE=`echo $BASE | awk '{ print $1 }'`;
	TIME=`echo $BASE | awk '{print substr($2,0,6)}'`;
	DIR=`dirname $1`
	mkdir -p $DIR/$DATE;
	mkdir -p $DIR/$DATE/$TIME;
	mv $1 $DIR/$DATE/$TIME;
	TARGET=`basename $1`
	NEWPATH=$DIR/$DATE/$TIME/$TARGET;
}

#start
PUSH $1;
while [[ $SPOINTER -ne 0 ]]; do
	POP;
	wrapper $SDATA;
	if [[ `file $NEWPATH | awk '{ print $2 }'` = "directory" ]]; then
		for i in `ls $NEWPATH`; do
			PUSH $NEWPATH/$i
		done
	fi
done