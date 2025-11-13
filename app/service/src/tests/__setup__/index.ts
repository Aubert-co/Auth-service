import { prisma } from "../../lib/prisma"

export const users = [{id:1,name:'lucas',password:'12345667e',email:'lucsssas@gmail.com'},
    {id:4,name:'jose',password:'123456eee',email:'jossse@gmail.com'}
]
export const oneUser = {name:'lucas',password:'1234456',email:'joses@gmail.com',id:1}

export const deleteUser = async():Promise<void>=>{
    await prisma.user.deleteMany({
        where:{
            id:{
                gt:0
            }
        }
    })
}
 


export const cleanAllDb = async():Promise<void>=>{
  
    await deleteUser()
}

export const createOneUser = async():Promise<void>=>{
    await prisma.user.create({data:oneUser})
}


