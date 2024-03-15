import React from 'react'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const creatNewUser = async () => {
    const user = await currentUser()
    console.log("🚀 ~ creatNewUser ~ user:", user)

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string
        }
    })

    console.log("🚀 ~ creatNewUser ~ match:", match)

    if (!match) {

        console.log("user.id", user?.id, user?.emailAddresses[0].emailAddress)
        await prisma.user.create({
            data: {
                clerkId: user?.id as string,
                email: user?.emailAddresses[0].emailAddress
            }
        })

    }
    redirect('/journal')
}
const NewUser = async () => {
    await creatNewUser()
    return (
        <div>...Loading your awesome journal</div>
    )
}

export default NewUser