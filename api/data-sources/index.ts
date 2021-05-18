import { db } from "../db";
import { FirestoreDataSource } from "apollo-datasource-firestore";
import firebase from "firebase-admin";

export interface CompaniesDoc {
  readonly id: string;
  readonly collection: "companies";
  name: string;
}

export class CompaniesDataSource extends FirestoreDataSource<
  CompaniesDoc,
  unknown
> {}

const companiesCollection = db.collection(
  "companies"
) as firebase.firestore.CollectionReference<CompaniesDoc>;

const dataSources = () => ({
  companies: new CompaniesDataSource(companiesCollection),
});

export default dataSources;
