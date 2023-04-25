// import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import styles from "./page.module.css";
import HighScore from "@/components/HighScore";
import AccountHeader from "@/components/AccountHeader";

// async function getData(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("auth");
//     const id = await db.collection("users").find({email : "nahida@gmail.com"}).toArray();
//     return id;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// }

export default async function Home() {
  // const data = await getData();
  // console.log(data[0].email);
  return (
    <main className={styles.body}>
      <div style={{position: "absolute", top: "5%", right: "5%"}}>
        <AccountHeader></AccountHeader>
      </div>
      <div className={styles.menuContainer}>
        <p className={styles.title}>Retro Number Cruncher</p>
        <div className={styles.borderStart}>
          <Link className={styles.buttonStart} href="/game">
            START
          </Link>
        </div>
        <div className={styles.borderStart}>
          <Link className={styles.buttonStart} href="/game">
            Rank
          </Link>
        </div>
        <div className={styles.temporary}>
          <HighScore></HighScore>
        </div>
      </div>
    </main>
  );
}
