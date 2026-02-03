import { View , TextInput, Button, StyleSheet ,Text, FlatList,TouchableOpacity} from "react-native";
import{useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
type Book = {
    id : string,
    name: string,
    price: string
}
export default function Home() {
    const [allBook, setAllBook] = useState<Book[]>([])

    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllBook(JSON.parse(data))
        }
    }

    async function removeBook(id:string) {
        const newBook = allBook.filter((_, i) => _.id != id)
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)
    }

    return (
        <View>
            <FlatList
            data={allBook}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=>(
                <View>
                    <Text style={{fontSize:20}}> รหัส : {item.id}</Text>
                    <Text style={{fontSize:20}}> เรื่อง : {item.name}</Text>
                    <Text style={{fontSize:20}}> ราคา : {item.price}</Text>
                    <TouchableOpacity style={mystyle.Btn} onPress={()=> removeBook(item.id)}>
                        <Text style={{color:"red", fontSize:20}}>ลบ</Text>
                    </TouchableOpacity>
                </View>
            )}
            />
        </View>
    )
}

const mystyle = StyleSheet.create({
    input:{
        width:"80%",
        borderWidth: 1
    },
    
    Btn:{
        borderWidth:1,
        backgroundColor:"ffffff",
        width:"100%",
        height:30,
        marginTop:10,
        alignItems:"center"
    }

})
