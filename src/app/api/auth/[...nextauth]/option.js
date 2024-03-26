import connectToMongodb from '../../../../db/connectToMongoDB';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../../server/User';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../libs/mongoConnect';

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req,res) {               
        const { email, password } = credentials;

        await connectToMongodb();

        const db = await clientPromise;
        const user = await User.findOne({ email });
        const isValidPassword = user && bcrypt.compareSync(password, user.password);

        if (isValidPassword) {
          return user;
        }

        return null;
      },
    }),
  ],
};
