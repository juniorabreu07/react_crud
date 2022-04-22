import { environment } from './../environments/environment';
import axios from "axios";
import { Subject } from 'rxjs';

export const MY_DATA = new Subject<any>();

export class ApiService {
  static baseUrl = environment.baseUrl
  static headers = { responseType: 'json' }
  public static post(path: string, obj: any, headers = { 'Content-Type': 'application/json' }): Promise<any> {
    return axios.post(this.baseUrl + path, obj, { headers: headers, withCredentials: true });
  }
  public static put(path: string, obj: any, headers = { 'Content-Type': 'application/json' }): Promise<any> {
    return axios.put(this.baseUrl + path, obj, { headers: headers, withCredentials: true });
  }
  public static delete(path: string, obj: any): Promise<any> {
    return axios.delete(this.baseUrl + path + '/' + obj.id, {
      headers: { 'Content-Type': 'application/json' }, withCredentials: true
    });
  }
  public static get(path: string): Promise<any> {
    return axios.get(this.baseUrl + path, {
      headers: { 'Content-Type': 'application/json' }, withCredentials: true
    });
  }

  public static getCurrentUser() {
    const userStr = localStorage.getItem("user");
    console.log('getCurrentUser', userStr);
    if (userStr) return JSON.parse(userStr);

    return null;
  }
  public static setCurrentUser(user: Object) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public static logout() {
    localStorage.clear();
  }
}