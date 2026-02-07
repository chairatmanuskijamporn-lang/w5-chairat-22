import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
type Book = {
    id: string,
    name: string,
    price: string
}

export default function Add() {
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
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

    async function addbook() {
        const book = {
            id: Date.now().toString(),
            name: bookName,
            price: bookPrice
        }

        console.log(book)

        const newBook = [...allBook, book]
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)

        setBookName("")
        setBookPrice("")
    }

    return (
        <View >
            <Text style={{ fontSize: 20 }}>ชื่อหนังสือ</Text>
            <TextInput value={bookName} onChangeText={setBookName}
                style={mystyle.input} />
            <Text style={{ fontSize: 20 }}>ราคาหนังส์อ</Text>
            <TextInput value={bookPrice} onChangeText={setBookPrice}
                style={mystyle.input} />
            <TouchableOpacity style={mystyle.Btn} onPress={() => addbook()}>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>บันทึก</Text>
            </TouchableOpacity>

        </View>
    )
}

const mystyle = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 2
    },

    Btn: {
        borderWidth: 1,
        backgroundColor: "black",
        width: "100%",
        height: 30,
        marginTop: 10,
        alignItems: "center"
    }

})

