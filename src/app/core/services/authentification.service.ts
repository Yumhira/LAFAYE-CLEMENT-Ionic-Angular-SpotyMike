import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenVerificationResponse } from 'src/app/core/interfaces/user'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<TokenVerificationResponse> {
    return this.http.post<TokenVerificationResponse>('/api/verifyToken', { token });
  }
}
