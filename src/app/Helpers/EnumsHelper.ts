import {Colors,Marks} from '../Enums/enums'

export class EnumsHelper {
    public GetColorByName(Name: string) {
        switch(Name) {
            case 'Категорично проти': {
                return Colors.VeryLow;
            }            
            case 'Проти': {
                return Colors.Low;
            }            
            case 'Утримався': {
                return Colors.Default;
            }            
            case 'За': {
                return Colors.High;
            }            
            case 'Категорично за': {
                return Colors.VeryHigh;
            }
        }
        return;
    }

    public GetColorByMark(Mark: number) {
        switch(Mark) {
            case -2: {
                return Colors.VeryLow;
            }            
            case -1: {
                return Colors.Low;
            }            
            case 0: {
                return Colors.Default;
            }            
            case 1: {
                return Colors.High;
            }            
            case 2: {
                return Colors.VeryHigh;
            }
        }
        return;
    }

    public GetColorForComparision(id: number) {
        switch(id) {
            case 1: {
                return '#33ff33'
            }
            case 2: {
                return '#aaff80'
            }
            case 3: {
                return '#ffff66'
            }
            case 4: {
                return '#ffcc66'      
            }
            case 5: {
                return '#ffaa00'
            }
            case 6: {
                return '#e69900'
            }
            case 7: {
                return '#ff8080'
            }
            case 8: {
                return '#ff80aa'
            }
            case 9: {
                return '#d9b3ff'
            }
            case 10: {
                return '#d580ff'
            }
        }
    }
}